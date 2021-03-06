import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { fetchImg } from "../../service/imgApi";
import Layout from "components/Layout";
import GalleryPage from "pages/GalleryPage";


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParam, setSearchParams] = useSearchParams();

  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      if (searchParam.get('query') === null) {
        return;
      } else {
        setSearchQuery(searchParam.get('query'));
      }
    }
    loadImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);


  const increasePage = () => {
    setPage(prevState => prevState + 1);
  }

  const resetState = () => {
    setPage(1);
    setImgs([]);
    setError(null);
  }

  const loadImages = () => {
    setIsLoading(true);
    
    fetchImg(searchParam.get('query'), page).then(data => {

      if (data.length === 0) {
        setError(new Error("Incorrect request. Please, check your request."));
        return;
      }

      setImgs(prevState => [...prevState, ...data]);

    }).catch(error => {
      console.log(error);
      setError(new Error("Oops, something went wrong. Try later."));
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <Routes>
      <Route path='/' element={<Layout updateSearchQuery={setSearchQuery} updateSearchParams={setSearchParams} resetState={resetState}/>}>
        <Route index element={<GalleryPage images={imgs} increasePage={increasePage} page={page} isLoading={isLoading} error={error}/> }/>
      </Route>
       </Routes>
    );
}



    
  
  


