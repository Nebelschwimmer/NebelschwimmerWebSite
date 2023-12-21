import './addTextPage.scss'
import { useForm } from "react-hook-form";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';



export const AddTextPage = ({langEn}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmitData = () => {

  }

  return (
    <div className='add__text'>
        <form className='add__text__container' onSubmit={handleSubmit(onSubmitData)}>
          <h2 style={{color:'darkorange'}}>{langEn ? 'Add Text' : 'Добавить текст'}</h2>
          
          <label className='add__text__label'>{langEn ? 'Name' : 'Название'}
            <input 
            className='add__text__input' 
            type="text"
            {...register("text_name")}
            ></input>
          </label>
          
          { langEn ?
            <div className='add__text__textarea__wrapper'> Content (EN)
              
              <TextareaAutosize 
              
              className='add__text__textarea'
              {...register("text_content_en")}
              >
              </TextareaAutosize>
            </div>
          :
            <div className='add__text__textarea__wrapper'> Содержание (Русс.)
              <textarea 
              className='add__text__textarea'
              {...register("text_content_en")}
              >
              </textarea>
            </div>
          }
          
          <div className='add__text__sumbit_btn_wrapper'>
            <button className='add__text__sumbit_btn'>{langEn ? 'Publish' : 'Опубликовать'}</button>
          </div>
        </form>
     
    </div>
  )
}