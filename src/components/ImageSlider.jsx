import React from 'react'
import { useState } from 'react'
import styles from "./ImageSlider.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


function ImageSlider({slides}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const previousSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(slides.length - 1)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }
    const nextSlide = () => {
        if (currentSlide === slides.length - 1) {
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }
  return (
    <div className={styles.slider}>
        <div onClick={previousSlide} className={styles.leftArrow}><IoIosArrowBack/></div>
        <div onClick={nextSlide} className={styles.rightArrow}><IoIosArrowForward/></div>
        {slides.length && <img className={styles.slide} src={slides[currentSlide].url}></img>}
    </div>
  )
}

export default ImageSlider