import './auth.css'
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { SignInWithGoogle } from '../../auth';
import { Backbutton } from '../BackButton/BackButton';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, } from "react-hook-form";



export const Register = ({currentUser, setCurrentUser, signInWithGoogle}) => {

const [emailExists, setEmailExists] = useState('')


  const navigate = useNavigate()
// Стейт для отображения кнопок "Войти с Google" и "Cледующий шаг"
const [showBtn, setShowBtn] = useState(true)

// При входе с аккаунта Google
const onSignInWithGoogle = () => {
  signInWithGoogle();
  navigate('/')
}


// Достаем пользователя из Firebase
const auth = getAuth();
const user = auth.currentUser

console.log(user)

// Объявление полей для формы
const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

const emailRegister = register("email", {
  required: "Email required",
  pattern: {
    message: "Incrorrect email!",
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  }
});


// Register для пароля
const passwordRegister = register("password", {
  required: "Password required",
  pattern: {
    message:
    "Your password must be not shorter than 6 characters and have at least one upper case English letter.",
    value: /(?=.*?[A-Z])/g
  }
});


async function RegisterWithEmailPassword(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setCurrentUser(user);
      navigate('/user-settings')
      // auth.signOut();
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use' ) {}
      setEmailExists('This email already exists') 
      // alert(emailExists);
    });
  
}

useEffect(()=>{
  setTimeout(()=>{
    if (emailExists !=='')
    setEmailExists('')
  }, 3000)
}, [emailExists])




// Отправляем данные формы
const sendSignUpData = async (data) => {
    await RegisterWithEmailPassword(data.email, data.password)   
}
// Не показывать кнопки "Войти с Google" и "Cледующий шаг", если пользователь не зарегистрировался.
useEffect(()=>{
  if (user !== null) setShowBtn(false)
}, [user])



  return (
    <div>
      <div className='auth_main'>
        {/* Шапка */}
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
          <div className='auth_top'>
          <h1 style={{fontSize:'36px', color:'darkorange'}}>Registration</h1>
          <span >Existing user? <Link style={{color: 'violet'}} to='/sign-in'>Sign in!</Link></span>
          </div>
          {/* Форма */}
          <form onSubmit={handleSubmit(sendSignUpData)}>
            <div className='auth_form'>
              {/* Инпут для email */}
              <div className='auth_label_input'>
                <label >Email Address:<span className='auth_req'>*</span></label> 
                  <input 
                  className='auth_input' 
                  type='email'
                  {...emailRegister}
                  >
                  </input>
              </div>
              {/* Текст при ошибках email*/}
              { errors?.email  &&
                <small className='auth_small'>{errors.email?.message}</small>
              }
              {/* Показываем надпись, что email существует, если приходит ошибка */}
              { emailExists !== '' && <small className='auth_small'>{emailExists}</small>
              }
              
              {/* Инпут для пароля */}
              <div className='auth_label_input'>
                <label >Password: <span className='auth_req'>*</span></label> 
                  <input 
                  className='auth_input' 
                  type='password'
                  {...passwordRegister}
                  minLength={6}
                  >
                  </input>
              </div>
              {/* Текст при ошибках пароля*/}
              {errors?.password && (
              <small className='auth_small'>{errors.password?.message}</small>)
              }

              {/* <div className='auth_label_input'> 
                <label >Confirm Password: <span className='auth_req'>*</span></label>
                  <input className='auth_input' type='password'></input>
              </div> */}
              </div>
            <div className='auth_sign_btn_wrapper'>
            {/* Кнопка для подтверждения отправки */}
            {showBtn &&
              <button type="submit" className='auth_sign_btn'>Create My Account</button>
            } 
            </div>
              
          </form> 
          {/* Кнопка "Следующий шаг" будет отображаться, если форма отправлена */}
          {/* {!showBtn &&
          <button onClick={()=>{navigate('/user-settings')}} className='auth_sign_btn'>Next step</button>
          } */}
          {/* Кнопка "Войти с Google" будет отображаться, если форма не отправлена */}
          {/* {showBtn && */}
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>Sign in with Google Account <GoogleIcon fontSize='large'/></button>
          {/* } */}
        </div>
      </div>
    </div>
  )
}