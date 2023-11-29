import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import './modalWindow.css'

export  function ModalWindow({setShowModal, deleteUserAccount, children}) {



  return (
    <div className='modal'>
        <div className='modal_content'>
          {/* <div className='modal_top'>
            <h3 style={{color:'darkorange'}}>Are you sure you want to delete your account?</h3>
            <span>This action cannot be undone</span>
          </div>
          <div className='modal_btns_wrapper'>
            <button onClick={()=>{deleteUserAccount()}} className='modal_btn_warn'>Delete</button>
            <button onClick={()=>{setShowModal(false)}} className='modal_btn'>Cancel</button>
          </div> */}
          {children}
        </div>
    </div>
  );
}