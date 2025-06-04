import Modal from "react-modal";

import React from "react";
import { Slide } from "react-slideshow-image";
import { IoMdClose } from "react-icons/io";


function ModalContainer({ children, isOpen, closeModal }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[70%] bg-white rounded-lg shadow-lg p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full flex items-center justify-center">
        <IoMdClose
          className="absolute top-3 right-3 w-6 h-6  rounded-full  cursor-pointer hover:scale-110 transition-transform z-20"
          onClick={closeModal}
        />
        {children}
      </div>
    </Modal>
  );
}

export default ModalContainer;
