import React, {useEffect, useState} from 'react'
import parse from 'html-react-parser';
import styles from "./CardDetailPage.module.css"
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/slices/routeLocationSlice";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function CardDetailPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchArticle = async () => {
      try{
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@merveartuttt')
        const data = await response.json()
        const article = data.items.find(item => item.link.includes('secure-sockets-layer-ssl-ve-transport-layer-security-tls-11acccd8260'))
        if (article) {
          setTitle(article.title)
          setContent(article.content)
        }
        setLoading(false)
      } catch(error){
        console.log(error)
        setLoading(false)
      }
     
    }
    fetchArticle()
  }, [])
    const navigatePage = (page) => {
      navigate(`/${page}`);
      dispatch(setLocation(`/${page}`));
    }
  return (
    <div>
       <NavBar navigatePage={navigatePage} />
       <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{title}</h2>
          <div className={styles.articleContent}>
            {parse(content)}
            </div>
        </div>
      )}
    </div>
    </div>
   
  )
}

export default CardDetailPage