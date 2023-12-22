
import { useState, useEffect } from 'react';
import { SingleText } from '../SigleText/SingleText';
import './textCard.css'
import { useParams } from 'react-router-dom';
import { getTextByID } from '../../utils/api_texts';

export const SingleTextPage = ({langEn}) => {

const [singleText, setSingleText] = useState({})  
const id = useParams()
const textID = id?.textID
console.log(textID)


// Getting text by ID
useEffect(()=>{ 
  getTextByID(textID)
  .then((res) => {
    setSingleText(res);
  });
}, [])



  return (
          <SingleText
          singleText={singleText}
          id={textID}
          setSingleText={setSingleText}
          langEn={langEn}
          />
        )
      

  
}