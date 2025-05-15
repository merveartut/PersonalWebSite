import Modal from "react-modal";

import React, { useState } from "react";
import styles from "./Modal.module.css"
import { Slide } from "react-slideshow-image";
import { IoMdClose } from "react-icons/io";


function ModalContainer({ children, isOpen, closeModal }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
     <IoMdClose className={styles.closeButton} onClick={closeModal}/>
      {children}
    </Modal>
  );
}

export default ModalContainer;
