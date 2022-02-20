import {useState, useRef, useCallback} from 'react';
import useSearch from './components/useSearch';

function App() {
  //states;
  const [query, setQuery]= useState('');
  const [pageNumber, setPageNumber]= useState();
  const {books, loading, error, hasMore}= useSearch(query, pageNumber);
  const observer= useRef();

  const lastBookElemRef= useCallback(
    //callback
    (elemNode) => {
      if(loading) return
      if(observer.current) observer.current.disconnect()
      observer.current= new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && hasMore){
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      })
      if(elemNode) observer.current.observe(elemNode)
    },
    [loading, hasMore]
  )

  function changeHandler(e){
    //set states
    setQuery(e.target.value);
    setPageNumber(1);
  }


  return (
    <div className="App">
      <input type="text" value={query} onChange={changeHandler}/>
      <div id="searchResults">
        {books.map((book, index)=>{
          return index === (books.length - 1) ? 
          <div key={book} ref= {lastBookElemRef}>{book}</div> : <div key={book}>{book}</div>
        })}
        {loading && "Loading..."}
        {error && "Error"}
      </div>
    </div>
  );
}


export default App;
