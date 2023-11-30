import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import './modalWindow.css'
import cn from "classnames";


export  function ModalWindow({setShowModal, showModal, deleteUserAccount, children}) {



  return (
    <div className={cn("modal", { ["active"]: showModal })} onClick={()=>{setShowModal(false)}}>
        <div  className={cn("modal_content", { ["active"]: showModal })}  onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
    </div>
  );
}