import './textPage.css'
import textsData from './texts.json'
import {TextCard} from '../../components/TextCard/TextCard'
import { useState, useEffect, useRef } from 'react'


export const TextsPage = ({langEn}) => {
  const [texts, setTexts] = useState([]);




  useEffect(()=>{ 
    fetch('http://localhost:3020/texts').then((response) => response.json()).then((res) => {
      setTexts(res.data);
    });
}, [])

console.log(texts.map(e=>e.text_url))



  
  return (
    <div>
      <h1 style={{color:'darkorange'}}>My texts</h1>
      <h3>Contents:</h3>
      <p>Bored</p>
      <p>Ghosts of Sorrow</p>
      
      {texts?.map((el) => {
        return (
          <TextCard
            {...el}
            name = {el.text_name}
            key={el.text_id}
            id={el.text_id}
            description_en={el.text_description_en}
            description_ru={el.text_description_ru}
            likes={el.text_likes}
            content_en={el.text_content_en}
            content_ru={el.text_content_ru}
            langEn={langEn}
            text_url={el.text_url}
          />
        );
      })}
    
    </div>
  )
}