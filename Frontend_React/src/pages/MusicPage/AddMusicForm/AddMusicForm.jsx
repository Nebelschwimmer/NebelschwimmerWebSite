import { useForm } from "react-hook-form";
import '../musicPage.css'
import { addNewTrack } from "../../../utils/api_music";

export const AddMusicForm = ({langEn}) => {

  // Для формы
  // const {register,  handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm()



const sendNewTrackData = async (data) => {
  

  const formData = new FormData();
 
  formData.append('file', data.file[0]);
  
  console.log(data.trackToUpload[0])
  const res = await fetch('http://localhost:3020/music/upload', {
    method: 'POST',
    body: formData
  }).then((res) => console.log(res));
};


const fetchUploadFile = (day) => {
  fetch('http://localhost:3020/music/upload', {
    method: 'POST',
    body: data
  }).then((res) => console.log(res));
}






  return (
    <div>
      <h2 className="add_music_title">{langEn ? 'Add New Track' : 'Добавить музыку'}</h2>
      <div className="add_music_form_container">
        <div className="add_music_form_wrapper_right">
          <form method="post" enctype="multipart/form-data" onSubmit={handleSubmit(sendNewTrackData)} className="add_music_form"> 
          
            {/* Инпут для имени */}
            <div className='auth_label_input'>
              <label className='add_music_input_label'>{langEn ? 'Name :' : 'Название :'}<span className='auth_req'> *</span></label> 
                <input 
                className='add_music_input' 
                // {...register("track_name", { required: true })}
                type='text'
                >
                </input>
            </div>
            {/* Инпут для описания на англ. */}
            {langEn ?
              <div className='auth_label_input'>
                <label className='add_music_input_label'>Description :</label> 
                  <input 
                  className='add_music_input' 
                  // {...register("description_en", { required: false })}
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
                  // {...register("description_ru", { required: false })}
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
                    // {...register("picture_url", { required: false })}
                    >
                    </input>
              </div>
            
              {/*Cекция для добавления музыки из файла  */}
              <section className="add_music_add_track_container">
                <div className="add_music_choose_image_wrapper">
                  <span style={{fontWeight:'600'}}>Сhoose audio file <span className='auth_req'> *</span></span>
                  <div className="add_music_choose_image_btn_wrapper">
                    <label className="add_music_add_track_btn">
                      Add file
                      <input
                      
                      type="file" 
                      className="add_music_add_track_input"
                      // onChange={handleUploadedFile}
                      {...register('file', { required: true })}
                      >
                      </input>
                    </label>
                    <small style={{color:'darkorange'}}>Permited formats: .mp3, .mpeg</small>
                
                  </div>
                  <div className="add_music_drop_area">
                      Or drop it here
                    </div>
                </div>
              </section>
              <div className="add_music_create_btn_wrapper">
                <input type="submit" className="add_music_create_btn"></input>
                </div>
              </form>
        
        </div>
       
        
      </div>
      
    </div>
  )
}