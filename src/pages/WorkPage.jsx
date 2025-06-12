import React, { useState } from "react";
import styles from "./WorkPage.module.css";
import Modal from "../components/ModalContainer";
import ImageSlider from "../components/ImageSlider";
import workItems from "../data/workItems";
import { Chip } from "@mui/material";

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
          className="rounded-lg shadow-md border-[1px] bg-zinc-50 border-blue-900 p-8 w-[320px] h-[400px] flex flex-col items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
          style={{
            minWidth: 0,
          }}
        >
          <div className="flex flex-col gap-6 w-full flex-grow">
            <h3 className="text-xl font-rubik ">{item.title}</h3>
            <p className="font-roboto ">{item.description}</p>

            <div className="flex flex-col gap-2">
              {/* 🟡 Progress Warning */}
              {!item.statusDone && (
                <p className="text-yellow-600 font-semibold text-sm">
                  🚧 Work in Progress
                </p>
              )}

              <span
                onClick={() => window.open(item.githubLink, "_blank")}
                className="cursor-pointer text-blue-600 hover:underline font-rubik font-medium"
              >
                Open GitHub
              </span>
              <div className="flex flex-row gap-2 flex-wrap">
                {item.technologies.map((tech) => (
                  <Chip
                    label={tech}
                    size="small"
                    className="!bg-blue-900 !text-white !font-roboto !font-medium"
                  ></Chip>
                ))}
              </div>
            </div>
          </div>

          {/* Move Modal outside the map or keep here if modal tied to each item */}
          <Modal Modal isOpen={isModalOpen} closeModal={closeModal}>
            <ImageSlider slides={selectedImages} />
          </Modal>
        </div>
      ))}
      <Modal
        isOpen={showProgressModal}
        closeModal={() => setShowProgressModal(false)}
      >
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-2">🚧 Work in Progress</h2>
          <p className="text-gray-700">
            This project is not yet live. Please check back later!
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default WorkPage;
