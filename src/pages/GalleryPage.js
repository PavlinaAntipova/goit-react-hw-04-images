import Button from "components/Button";
import ImageGallery from "components/ImageGallery";
import Modal from "components/Modal";
import { useState } from "react";
import { Oval } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { PER_PAGE } from "service/imgApi";

const TOTAL_IMGS = 500;
const totalRequests = Math.floor(TOTAL_IMGS / PER_PAGE);


export default function GalleryPage({images, increasePage, page, error, isLoading}) {

    const [showModal, setShowModal] = useState(false);
    const [idModalItem, setIdModalItem] = useState(null);

  
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  }

  const getItemId = id => {
    setIdModalItem(id);
  }
    
const [modalItem] = images.filter(img => idModalItem === img.id);


    return <>
        {error && <h2>{error.message}</h2>}
        {images.length > 0 && <> <ImageGallery images={images} toggleModal={toggleModal} getItemId={getItemId} />
            {totalRequests !== page && <Button increasePage={increasePage} />} </>}
        {isLoading && <div className="loader"><Oval height="100" width="100" color='#00a3ff' ariaLabel='loading' /></div>}
        {showModal && <Modal toggleModal={toggleModal}><img src={modalItem.largeImageURL} alt={modalItem.tags} /></Modal>}
        
        </>
 
}