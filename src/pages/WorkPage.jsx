import React, { useState } from "react";
import styles from "./WorkPage.module.css";
import Modal from "../components/ModalContainer";
import ImageSlider from "../components/ImageSlider";
import workItems from "../data/workItems";
import { useMediaQuery } from "@mui/material";
import magnifyIcon from "../assets/search.png";

function WorkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };
  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`flex flex-wrap min-h-screen h-full  gap-8 items-center justify-center p-10 snap-start w-full max-w-full px-4 py-5 ${
        isSmallScreen ? "ml-0" : "ml-[160px]"
      }`}
      style={{ minWidth: 0 }} // allow shrinking below 400px on mobile
    >
      {workItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md border-orange-900 border-2 p-6 w-[320px] h-[420px] flex flex-col items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          style={{
            minWidth: 0,
            cursor: `url(${magnifyIcon}) 16 16, auto`, // Custom cursor
          }}
        >
          <div className="flex flex-col gap-2 w-full flex-grow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            <strong
              onClick={() => window.open(item.githubLink, "_blank")}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Open GitHub
            </strong>
            <p className={styles.technologies}>
              <strong>Technologies:</strong> {item.technologies.join(", ")}
            </p>
          </div>

          <div className="flex-shrink-0 cursor-pointer">
            {item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt={item.title}
                className={`${styles.thumbnail} rounded-md shadow-sm hover:scale-105 transition-transform duration-300`}
                onClick={() => openModal(item.images)}
              />
            ) : (
              <div className="w-[200px]" />
            )}
          </div>

          {/* Move Modal outside the map or keep here if modal tied to each item */}
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <ImageSlider slides={selectedImages} />
          </Modal>
        </div>
      ))}
    </div>
  );
}

export default WorkPage;
