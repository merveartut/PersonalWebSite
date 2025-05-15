import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import WorkPage from "./WorkPage";
import styles from "./HomePage.module.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/slices/routeLocationSlice";
import ContactPage from "./ContactPage";
import BlogPage from "./BlogPage";
import CardDetailPage from "./CardDetailPage";
import { useMediaQuery } from "@mui/material";

function HomePage() {
  const workPageRef = useRef(null);
  const homePageRef = useRef(null);
  const contactPageRef = useRef(null);
  const blogPageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div
      ref={homePageRef}
      className={`flex flex-col h-full w-[calc(100%-160px)] m-y-auto p-y-[20px] min-w-[400px] ${
        isSmallScreen ? "" : "ml-[160px]"
      } `}
    >
      <div className="flex flex-col md:flex-row h-screen w-full gap-4 items-center justify-center p-5 fixed">
        <div className="flex flex-col align-middle items-center gap-8">
          <h1 className="font-source">Merve Artut</h1>
          <h3 className="font-roboto font-bold text-rose-900">
            Software Developer
          </h3>
          <p className="w-auto max-w-[600px] font-source">
            I’m a software developer passionate about creating digital
            experiences that make a real impact. With a constant drive to learn
            and grow, I focus on building innovative solutions that solve
            problems and improve lives. My goal is to contribute to meaningful
            projects that push the boundaries of technology and leave a lasting
            impression.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src="https://images.pexels.com/photos/48794/boy-walking-teddy-bear-child-48794.jpeg?cs=srgb&dl=pexels-pixabay-48794.jpg&fm=jpg"
            className={styles.image}
            alt="Sample"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
