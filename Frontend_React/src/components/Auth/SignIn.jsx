import './auth.css'
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';

import { Backbutton } from '../BackButton/BackButton';
import { useState, useEffect } from 'react';
import { getAuth, } from 'firebase/auth';
import { useForm, } from "react-hook-form";
import {signInWithEmailAndPassword } from 'firebase/auth'





export const SignIn = ({signInWithGoogle}) => {
const navigate = useNavigate()

const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });


const [loginErr, setLoginErr] = useState(false)

const auth = getAuth();
const user = auth.currentUser;


const onSignInWithGoogle = () => {
  signInWithGoogle();
  navigate('/')
}

async function SingInWithEmailAndPassword (email, password) {

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    }).then(()=>{navigate('/')})
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-login-credentials' ) setLoginErr(true) 
    });
  }


  useEffect(()=>{
    setTimeout(()=>{
      if (loginErr !=='')
      setLoginErr('')
    }, 5000)
  }, [loginErr])






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






const sendSignInData = async (data) => {
  try {
    await SingInWithEmailAndPassword(data.email, data.password)
  }
  catch(errors) {
  console.log(errors)
  } 
}

const handleSubmitClick = () => {
navigate('/')
}



  return (
    <div>
      <div className='auth_main'>
        
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>Sign In</h1>
              <span >New user? <Link style={{color: 'violet'}} to='/register'>Sign up!</Link></span>
            </div>
          {/* Форма */}
            <form onSubmit={handleSubmit(sendSignInData)}>
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
                {/* Обработка ошибок с почтой */}
                { errors?.email  &&
                <small className='auth_small'>{errors.email?.message}</small>
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
                { errors?.password  &&
                <small className='auth_small'>{errors.password?.message}</small>
                }
                {loginErr && <small style={{color: 'darkorange'}}>Login error! Check if your email address and your password are correct.</small>}
                </div>
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>Sign In</button>
              </div>
            </form> 
          <button className='auth_sign_btn' onClick={()=>{onSignInWithGoogle()}}>Sign in with Google Account <GoogleIcon fontSize='large'/></button>
          <button onClick={()=>{navigate('/password-reset')}} className='auth_sign_btn'>Forgot My Password</button>
        </div>
    
      </div>
    </div>
  )
}