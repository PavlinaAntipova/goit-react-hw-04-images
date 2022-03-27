import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Oval } from 'react-loader-spinner';

import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Modal from "../Modal";

import { fetchImg, PER_PAGE } from "../../service/imgApi";

const TOTAL_IMGS = 500;
const totalRequests = Math.floor(TOTAL_IMGS / PER_PAGE);

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idModalItem, setIdModalItem] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    loadImages();
  }, [searchQuery, page]);

  const updateSearchQuery = newValue => {
  setSearchQuery(newValue);
  }

  const increasePage = () => {
    setPage(prevState => prevState + 1);
  }

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  }

  const getItemId = id => {
    setIdModalItem(id);
  }

  const resetState = () => {
    setPage(1);
    setImgs([]);
    setError(null);
  }

  const loadImages = () => {
    setIsLoading(true);
    
    fetchImg(searchQuery, page).then(data => {

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

  // eslint-disable-next-line array-callback-return
  const modalItem = imgs.find(img => {
      if (idModalItem === img.id) {
        return img;
      }
    });

  return (
    <>
      <Searchbar updateSearchQuery={updateSearchQuery} resetState={resetState}/>

      {error && <h2>{error.message}</h2>}

      {imgs.length !== 0 && <>
        <ImageGallery images={imgs} toggleModal={toggleModal} getItemId={getItemId} />
       
        {totalRequests !== page && <Button increasePage={increasePage} />}
      </>}

      {isLoading && <div className="loader"><Oval height="100" width="100" color='#00a3ff' ariaLabel='loading' /></div>}

      {showModal && <Modal toggleModal={toggleModal}><img src={modalItem.largeImageURL} alt={modalItem.tags} /></Modal>}
        
    </>);
  
}



    
  
  


