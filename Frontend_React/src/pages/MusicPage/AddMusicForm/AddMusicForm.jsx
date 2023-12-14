import { useForm } from "react-hook-form";
import '../musicPage.css'
import { addNewTrack } from "../../../utils/api_music";
import { useState, useEffect } from "react";
import { useId } from 'react';

export const AddMusicForm = ({langEn, setShowModal, trackList, setTrackList}) => {

  // Для генерации случайного id
const track_id = useId()
// Стейты для показа информации о файле
const [showFileName, setShowFileName] = useState(undefined)
const [showFileSize, setShowFileSize] = useState(undefined)
// Стейт для активной кнопки для 2-й формы


// Для формы

const {
  register,
  handleSubmit,
  reset,
  formState,
  formState: { errors },
} = useForm()


// Для отображения инфо о файле 

const onFileAdding = (e) => {
  setShowFileName(e.target.files[0].name);
  setShowFileSize(((e.target.files[0].size) / 1048576 ).toFixed(2) +' Mb')
};

// Для отправки данных
const onSubmitData = async (data) => {
  // Объявляем экземпляр FormData
  const formData = new FormData();
// Цикл для объекта formData, чтобы добавить к нему файл 1-й файл из массива файлов и другие
// поля формы
  for (const key in data) {
    if (key === "file") {
      formData.append(key, data[key][0]);
    } else {
      formData.append(key, data[key]);
    }
  }

  await addNewTrack(formData).then((newTrack)=> {
    setTrackList([...trackList, newTrack]);
    setShowModal(false)
  })
  
}

  // Если юзер не задал фото в форме добавления трэка, делаем ссылку на дефолтную картинку
  useEffect(()=>{
    trackList.map((e) => {
      if (e.track_image === '')
      e.track_image = 'https://img.freepik.com/premium-photo/neon-flat-musical-note-icon-3d-rendering-ui-ux-interface-element-dark-glowing-symbol_187882-2481.jpg?size=626&ext=jpg'
      } 
    )
  },[trackList])


  return (
    <div>
      <h2 className="add_music_title">{langEn ? 'Add New Track' : 'Добавить музыку'}</h2>
      <div className="add_music_form_container">
        
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onSubmitData)}>
          <section className="add_music_add_track_container">
              <div className="add_music_choose_image_wrapper">
                <span style={{fontWeight:'600'}}>Сhoose audio file <span className='auth_req'> *</span></span>
                <div className="add_music_choose_image_btn_wrapper">
                  <label className="add_music_add_track_btn">
                    Add file
                    <input
                    type="file" 
                    {...register("file")}
                    className="add_music_add_track_input"
                    onInput={onFileAdding}
                    >
                    </input>
                  </label>
                  <small>{showFileName} {showFileSize}</small>
                  </div>
                    <small style={{color:'darkorange'}}>Permited formats: .mp3, .mpeg</small>
                  <div className="add_music_send_file_btn_wrapper">
                    {/* <button type="submit" className="add_music_create_btn">Send</button> */}
                  </div>
              </div>
            {/* </form> */}
          </section>
        
        {/* Для добавления имени, описания и пр. */}

        
        <section className="add_music_form_wrapper_right">
          <div>
            {/* <form  onSubmit={handleSubmit(sendNewTrackData)} className="add_music_form">  */}
            
              {/* Инпут для имени */}
              <div className='auth_label_input'>
                <label className='add_music_input_label'>{langEn ? 'Name :' : 'Название :'}<span className='auth_req'> *</span></label> 
                  <input 
                  className='add_music_input' 
                  {...register("track_name", { required: true })}
                  type='text'
                  maxLength={23}
                  >
                  </input>
              </div>
              {/* Инпут для описания на англ. */}
              {langEn ?
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Description :</label> 
                    <input 
                    className='add_music_input' 
                    {...register("track_description_en", { required: false })}
                    type='text'
                    >
                    </input>
                </div>
                :
                 // Инпут для описания на русс. 
                <div className='auth_label_input'>
                  <label className='add_music_input_label'>Описание : </label> 
                    <input 
                    className='add_music_input' 
                    type='text'
                    {...register("track_description_ru", { required: false })}
                    >
                    </input>
                </div>
              }
                {/* Инпут для картинки */}
                <div className='auth_label_input'>
                    <label className='add_music_input_label'>Image URL :</label> 
                      <input 
                      className='add_music_input' 
                      type='url'
                      {...register("track_image", { required: false })}
                      >
                      </input>
                </div>
                <div className="add_music_create_btn_wrapper">
                  <button type="submit" className="add_music_create_btn">Create New Track</button>
                </div>
              </div>
              
              
            
              
            </section>
            </form>
      </div>
    </div>
  )
}