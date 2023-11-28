import './auth.css'
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { SignInWithGoogle } from '../../auth';
import { Backbutton } from '../BackButton/BackButton';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, } from "react-hook-form";
import { ResetPasswordViaEmail } from '../../auth';
import {sendPasswordResetEmail } from 'firebase/auth'



export const ResetPassword = () => {
const navigate = useNavigate()

const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });

const auth = getAuth()
auth.languageCode = 'ru';


const sendResetPasswordData = async (data) => {
  try {
    await sendPasswordResetEmail(auth, data.email).then(data =>{alert('Reminder sent!');}).then(()=>{navigate('/sign-in')});
  }
  catch(errors) {
console.log(errors)
  } 
}

const handleSubmitClick = () => {
navigate('/')
}



  return (
    <div className='auth_layout'>
      <div className='auth_main'>
        
        <div className="auth_container">
          <div onClick={()=>navigate(-1)} className="auth_backbtn"><Backbutton/></div>
            <div className='auth_top'>
              <h1 style={{color:'darkorange'}}>Password Reset</h1>
            </div>

            <form onSubmit={handleSubmit(sendResetPasswordData)}>
              <div className='auth_form'>
                <div className='auth_label_input'>
                  <label >Email Address:<span className='auth_req'>*</span></label> 
                    <input 
                      className='auth_input' 
                      type='email'
                      {...register("email", { required: true })} 
                    >
                    </input>
                </div>
                <span>A reminder will be sent to your e-mail box.</span>
                <span>Check it, then sign in with the new password</span>
                
                {/* <div className='auth_label_input'>
                  <label >Password: <span className='auth_req'>*</span></label> 
                    <input 
                      className='auth_input' 
                      type='password'
                      {...register("password", { required: true })}  
                    >
                    </input>
                </div> */}
                </div>
              
              <div className='auth_sign_btn_wrapper'>
                <button type="submit" className='auth_sign_btn'>Send</button>
              </div>
            </form> 
        </div>
      </div>
    </div>
  )
}