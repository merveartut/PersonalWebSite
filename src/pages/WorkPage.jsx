import React, { useState } from "react";
import styles from "./WorkPage.module.css";
import Modal from "../components/ModalContainer";
import ImageSlider from "../components/ImageSlider";
import workItems from "../data/workItems";
import { useMediaQuery } from "@mui/material";

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
      className={`flex flex-col h-full w-[calc(100%-160px)] m-y-auto p-y-[20px] min-w-[400px] relative ${
        isSmallScreen ? "" : "ml-[160px]"
      } `}
    >
      <div className="flex flex-col h-screen w-full items-center justify-center p-5 fixed">
        <h1 className="mb-12">Works</h1>
        {/* <p>
        Welcome to my portfolio! Below are some of the projects I’ve worked on,
        showcasing my skills and expertise in software development, frontend
        engineering, and creative problem-solving.
      </p> */}
        {workItems.map((item, index) => (
          <div
            className={`my-5 py-5 flex flex-row items-center gap-5`}
            key={index}
          >
            <div className="flex flex-col gap-2">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong
                onClick={() => window.open(item.githubLink, "_blank")}
                className="cursor-pointer"
              >
                Open GitHub
              </strong>
              <p className={styles.technologies}>
                <strong>Technologies:</strong>
                {item.technologies.join(", ")}
              </p>
            </div>

            <div>
              {item.images.length > 0 ? (
                <img
                  src={item.images[0].url}
                  alt={item.title}
                  className={styles.thumbnail}
                  onClick={() => openModal(item.images)}
                />
              ) : (
                <div className="w-[200px]"></div>
              )}
            </div>

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <ImageSlider slides={selectedImages}></ImageSlider>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkPage;
