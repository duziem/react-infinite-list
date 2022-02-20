# React Infinite List

This Project uses an Infinite List mechanism that shows data based on an endless scroll event and loads data only as needed to avoid critical performance issues.

## API endpoint 
>>"https://openlibrary.org/search.json"

The endpoint returns a paginated list

The project uses a IntersectionObserver which provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

```javascript
useCallback(
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
```
The IntersectionObserver observes the element node which is appended to the end of every rendered list. For every list that is rendered a node is appended to identify the end of the list. As a user scrolls down
whenever the scroll bar intersects with the appended node the next page is rendered

## Run App
```bash
npm start
```