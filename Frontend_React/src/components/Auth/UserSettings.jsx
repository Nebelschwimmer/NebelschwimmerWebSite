import './auth.css'
import { useNavigate, Link } from 'react-router-dom';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState } from 'react';
import { useForm, } from "react-hook-form";
import {getAuth, signOut, deleteUser, updateProfile} from 'firebase/auth'
import './spinner.css'
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const UserSettings = ({currentUser, setCurrentUser, showModal, onSignOut, setShowModal}) => {
  
  // Стейт для спиннера
  const [showSpinner, setShowSpinner] = useState(false);
    // Стейт для автара
  const [avatar, setAvatar] = useState('')
 // Стейт для отображения инфо пользователя
  const [showProfileInfo, setShowProfileInfo] = useState(false)

  // Служебные переменные
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth.currentUser;
  
  
  // Таймаут для спиннера
    useEffect(()=>{
      setTimeout(()=>{
      if (showSpinner) setShowSpinner(false)
      },500)
    }, 
    [showSpinner])
  
  // Отображаем инфо о пользователе только если у него есть имя
  useEffect(()=>{
  if (currentUser.displayName !== null) setShowProfileInfo(true)},
  [currentUser])
  // Отображаем аватар по умолчанию, если пользователь не отправил ссылку на свой
  useEffect(()=>{
    if (currentUser.photoURL !== null) setAvatar(currentUser.photoURL)
    else setAvatar('https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')
  },
  [currentUser])
// // Функция для выхода
//   const onSignOut = async () => {
//     await signOut(auth).then(() => {
//       navigate('/')
//     }).catch((error) => {
//       console.log(error)
//     });
//     }
 // Указываем Реакту, чтобы не показывал модальное окно после регистрации или входа
    useEffect(()=>{
    if (showProfileInfo) setShowModal(false)
  }, [showProfileInfo])  

// Удаление аккаунта
    const deleteUserAccount = async () => {
      await deleteUser(user).then(() => {
      alert('User deleted.');
      navigate('/') 
    }).catch((error) => {
      alert('An error ocurred') 
    });
    }
    





// Логика для формы
  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

// Функция для обновления данных пользователя
  async  function UpdateUserData (userName, avatarURL) {
    await updateProfile(auth.currentUser, {
      displayName: userName, photoURL: avatarURL
    })
  }

// Для отправки данных
  const sendUpdateData = async (data) => {
    try {
      await UpdateUserData(data.userName, data.avatarURL).then(() => {
        // Ловим отредактированного пользователя
        const newUser = auth.currentUser;
        // Сеттим с колбэком
        setCurrentUser(()=>({...newUser}));
        // Сетим спинер
        setShowSpinner(true)
      })
    }
    catch(errors) {
    console.log(errors)
    } 
  }

  const userNameRegister = register("userName", {
    required: false,
    maxLength:20,
    message:
      "Your name is too long",
    }
  );






  return (
    <div>
      <div className='auth_main'>
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>Profile</h1>
              
              {showProfileInfo && 
              <div className='auth_user_info'>
                <div>
                  <img className='auth_user_avatar' src={avatar}/>
                </div>
                <div className='auth_user_info_name_wrapper'>
                  <div className='auth_user_info_name_top'>
                    <span className='auth_user_info_name'>{currentUser.displayName}</span>
                    <span>{currentUser.email}</span>
                  </div>
                  <div className='auth_user_info_edt_btns_wrapper'>
                    <button onClick={()=>{onSignOut()}} className='auth_user_info_edt_btn'>Sign Out</button>
                    <button onClick={()=>{setShowModal(true)}}  className='auth_user_info_edt_btn'>Delete Accout</button>
                  </div>
                  {!!showModal &&
                  <ModalWindow setShowModal={setShowModal} deleteUserAccount={deleteUserAccount}/>
                }
                
                </div>
              </div>
                }     
            </div>
            {/* Форма */}
            <h2 >Edit Profile</h2>
            <form onSubmit={handleSubmit(sendUpdateData)}>
              <div className='auth_form'>
              {/* Инпут длля имени */}
                <div className='auth_label_input'>
                    <label >Display Name  :</label> 
                      <input
                        className='auth_input' 
                        defaultValue={currentUser.displayName}
                        type='text'
                        maxLength='20'
                        {...register("userName", { required: false })}
                        // {...userNameRegister}  
                      >
                      </input>
                  </div>
                  { errors?.userName  &&
                <small className='auth_small'>{errors.userName?.message}</small>}
              {/* Инпут длля аватара */}
                  <div className='auth_label_input'>
                    <label>Avatar URL :</label> 
                      <input
                        style={{fontSize:'12px'}}
                        className='auth_input' 
                        defaultValue={currentUser.photoURL}
                        type='url'
                        {...register("avatarURL", { required: false })}  
                      >
                      </input>
                  </div>
                </div>
                <div className='auth_sign_btn_wrapper'>
                  <button type="submit" className='auth_sign_btn'>Send</button>
                  {/* Spinner */}
                  {showSpinner &&
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  }
                </div> 
                
            </form> 
            <button onClick={()=>{navigate('/')}} className='auth_sign_btn_finish'>Home</button>
          </div>
      </div>
    </div>
  )
}