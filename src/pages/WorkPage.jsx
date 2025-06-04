import React, { useState } from "react";
import styles from "./WorkPage.module.css";
import Modal from "../components/ModalContainer";
import ImageSlider from "../components/ImageSlider";
import workItems from "../data/workItems";
import magnifyIcon from "../assets/search.png";

function WorkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };
  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };
  console.log(magnifyIcon, "mmmm")
  return (
    <div
      className={`flex flex-wrap min-h-screen h-full  gap-8 items-center justify-center p-10 snap-start w-full max-w-full px-4 py-5 `}
      style={{ minWidth: 0 }} // allow shrinking below 400px on mobile
    >
      {workItems.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (!item.statusDone) {
              setShowProgressModal(true);
            } else {
              window.open(item.link, "_blank");
            }
          }}
          className="rounded-lg shadow-md border-[1px] border-stone-300 p-6 w-[320px] h-[420px] flex flex-col items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
          style={{
            minWidth: 0,
          }}
        >
          <div className="flex flex-col gap-2 w-full flex-grow">
            <h3 className="text-xl font-rubik">{item.title}</h3>
            <p className="text-gray-700 font-roboto">{item.description}</p>

            {/* 🟡 Progress Warning */}
            {!item.statusDone && (
              <p className="text-yellow-600 font-semibold text-sm">
                🚧 Work in Progress
              </p>
            )}

            <strong
              onClick={() => window.open(item.githubLink, "_blank")}
              className="cursor-pointer text-blue-600 hover:underline font-roboto-mono"
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
          <Modal Modal isOpen={isModalOpen} closeModal={closeModal} >
            <ImageSlider slides={selectedImages} />
          </Modal>
        </div >
      ))
      }
      <Modal isOpen={showProgressModal} closeModal={() => setShowProgressModal(false)} >
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-2">🚧 Work in Progress</h2>
          <p className="text-gray-700">This project is not yet live. Please check back later!</p>
        </div>
      </Modal>
    </div >
  );
}

export default WorkPage;
