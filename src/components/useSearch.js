import axios from 'axios'
import {useState, useEffect} from 'react'

export default function useSearch(query, pageNumber) {
    let cancel; //will be used to cancel the request
    const [books, setBooks]= useState([]);
    const [error, setError]= useState();
    const [loading, setLoading]= useState();
    const [hasMore, setHasMore]= useState();
    //query= query.toLowerCase();

    useEffect(() => {
        //effect
        if(pageNumber === 1) setBooks([]);
        setLoading(true);
        setError(false);
        //clear
        axios({
            url:"https://openlibrary.org/search.json",
            params:{q: query, page: pageNumber},
            cancelToken: new axios.CancelToken((c)=>cancel= c)
        }).then((res)=>{
            setBooks((prevBooks)=>{
                return [...new Set([...prevBooks, ...res.data.docs.map(data=> data.title)])]
                
            })
            setHasMore(res.data.docs.length > 0);
            setLoading(false);
        }).catch((e)=>{
            if(axios.isCancel(e)) return
            setError(true); //save any error that occurrs
        })

        return () => {
            //cleanup
            cancel();
        }
    }, [query, pageNumber])
    

     return{books,loading,error, hasMore};

}
