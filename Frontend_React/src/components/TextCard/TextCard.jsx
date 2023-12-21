
import { useState, useEffect } from 'react';

import './textCard.css'

export const TextCard = ({name, content, text_url, description_en, description_ru, langEn, content_en}) => {
  const [text, settext] = useState('');
  // Сделать асинхронной!
  function parseText() {
    fetch(text_url)
      .then((response) => response.text())
      .then((textcontent) => {
        settext(textcontent);
      });
    return text;
  }
  parseText()
  




  return (
    <div className='text_card_wrapper'>
  
    <h2>{name}</h2>
    <textarea readOnly={true} defaultValue={text}  className='text_card_textarea'></textarea>
    {/* <span role='textbox' className='text_card_textarea'>{text}</span> */}
    <button className='text_card_show_btn'>{langEn ? 'Show more' : 'Показать еще'}</button>
    
    </div>
  )
}