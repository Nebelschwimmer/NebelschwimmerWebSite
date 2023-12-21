import './textPage.css'
import textsData from './texts.json'
import {TextCard} from '../../components/TextCard/TextCard'
import { useState, useEffect, useRef } from 'react'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import {AddTextPage} from './AddTextPage/AddTextPage'
import { useNavigate } from 'react-router-dom'



export const TextsPage = ({langEn, texts, setTexts, currentUser, showModal, setShowModal}) => {
 
const navigate = useNavigate()


  useEffect(()=>{ 
    fetch('http://localhost:3020/textsTest', {
      headers: {
      "Content-Type": "application/json"
      }
    }
    )
    .then((response) => response.json())
    .then((res) => {
      setTexts(res);
    });
}, [])





  
  return (
    <div>
      <h1 style={{color:'darkorange'}}>My texts</h1>
      <button onClick={()=>{navigate('/texts/add-text')}}>Add New Text</button>
      <h3>Contents:</h3>
      <p>Bored</p>
      <p>Ghosts of Sorrow</p>
      
      {texts?.map((el) => {
        return (
          <TextCard
            {...el}
            text={el}
            key={el._id}
            content_en={el.content_en}
            content_ru={el.content_ru}
            langEn={langEn}
            currentUser={currentUser}
            texts={texts}
            setTexts={setTexts}
          />
        );
      })}
    
    </div>
  )
}