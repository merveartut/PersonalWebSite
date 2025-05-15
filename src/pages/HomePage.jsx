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
  const homePageRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div
      ref={homePageRef}
      className={`flex flex-col h-full w-fit m-y-auto p-y-[20px] min-w-[400px] `}
    >
      <div className="flex flex-col md:flex-row h-full w-full gap-4 items-center justify-center   p-5">
        <div className="p-3 rounded-lg overflow-hidden max-w-full">
          <img
            src="https://images.pexels.com/photos/48794/boy-walking-teddy-bear-child-48794.jpeg?cs=srgb&dl=pexels-pixabay-48794.jpg&fm=jpg"
            alt="Sample"
            className="block h-[300px] w-[400px] rounded-2xl"
          />
        </div>
        <div className="flex flex-col align-middle items-center gap-8">
          <h1 className="font-source-code-pro text-3xl">MERVE ARTUT</h1>
          <h3 className="font-roboto-mono font-bold text-rose-900">
            Software Developer
          </h3>
          <p className="w-auto max-w-[600px] font-source-code-pro text-left">
            I’m a software developer passionate about creating digital
            experiences that make a real impact. With a constant drive to learn
            and grow, I focus on building innovative solutions that solve
            problems and improve lives. My goal is to contribute to meaningful
            projects that push the boundaries of technology and leave a lasting
            impression.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
