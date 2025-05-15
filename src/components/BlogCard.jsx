import { width } from '@mui/system';
import React from 'react'
import styles from "./BlogCard.module.css"
import image from "../data/kk.jpeg"
import { useNavigate } from 'react-router-dom';

function BlogCard({ title, content, img }) {
  const navigate = useNavigate()
  return (
    <div className={styles.card} onClick={() => navigate("/Detail")}>
      <div style={{padding:"8px"}}>
      <img src={img} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{content}</p>
    </div>
      </div>
      
    </div>
  );
};




export default BlogCard