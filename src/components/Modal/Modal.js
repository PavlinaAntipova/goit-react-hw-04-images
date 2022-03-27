import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


import s from "./Modal.module.css"

const modalRoot = document.querySelector("#modal-root");


export default function Modal({ toggleModal, children }) {

  useEffect(() => {
    
    window.addEventListener("keydown", onEsc);
    window.addEventListener('scroll', onScroll);

    return () => {
    
    window.removeEventListener("keydown", onEsc);
    window.removeEventListener('scroll', onScroll);
    }
  }, []);

    const onEsc = (e) => {
    if (e.code === "Escape") {
      toggleModal();
}
  }

  const onScroll = () => {
window.scrollTo(0,0);
  }

  const onOverlay = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
   }
  return createPortal(<div className={s.overlay} onClick={onOverlay}>
       <div className={s.modal}>
         {children}
       </div>
     </div>, modalRoot);
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  children: PropTypes.object
}
