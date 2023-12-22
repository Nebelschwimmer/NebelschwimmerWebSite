import './addTextPage.scss'
import { useForm } from "react-hook-form";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { addNewText } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const AddTextPage = ({langEn, texts, setTexts}) => {
const navigate = useNavigate()
const [printAdded, setPrintAdded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const SendNewText = async (data) => {
    try {
      await  addNewText(data).then(res => {
        setTexts([...texts, res]);
        setPrintAdded(true)
        console.log(res)
      }
      )
      
    }
    catch(err){
      console.log(err)
    }
    

  }

  return (
    <div className='add__text'>
        <form className='add__text__container' onSubmit={handleSubmit(SendNewText)}>
          <h2 style={{color:'darkorange'}}>{langEn ? 'Add Text' : 'Добавить текст'}</h2>
          
          <label className='add__text__label'>{langEn ? 'Name' : 'Название'}
            <input 
            className='add__text__input' 
            type="text"
            {...register("name")}
            ></input>
          </label>
          
          { langEn ?
            <div className='add__text__textarea__wrapper'> Content (EN)
              {/* Сделать обычный текстареа! */}
              <TextareaAutosize 
              
              className='add__text__textarea'
              {...register("content_en")}
              >
              </TextareaAutosize>
            </div>
          :
            <div className='add__text__textarea__wrapper'> Содержание (Русс.)
              <textarea 
              className='add__text__textarea'
              {...register("content_ru")}
              >
              </textarea>
            </div>
          }
          
          <div className='add__text__sumbit_btn_wrapper'>
            <button type='submit' className='add__text__sumbit_btn'>{langEn ? 'Publish' : 'Опубликовать'}</button>
          </div>
        {printAdded && <span>{langEn ? 'Your text added successfully' : "Текст успешно добавлен"}</span>}
        </form>
    </div>
  )
}