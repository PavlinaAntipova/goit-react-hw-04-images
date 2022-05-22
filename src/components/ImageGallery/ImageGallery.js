import React from "react";
import PropTypes from 'prop-types';

import ImageGalleryItem from "../ImageGalleryItem";

import s from "./ImageGallery.module.css"

function ImageGallery({images, toggleModal, getItemId}) {
    return <ul className={s.gallery}>
        {images.map((img, index) => <ImageGalleryItem id={img.id} key={index} tags={img.tags} url={img.webformatURL} toggleModal={toggleModal} getItemId={getItemId} />)}
        
</ul>
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.array,
    toggleModal: PropTypes.func,
    getItemId: PropTypes.func

}