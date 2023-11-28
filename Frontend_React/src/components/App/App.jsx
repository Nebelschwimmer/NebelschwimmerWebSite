import './App.css';
import { Header } from '../Header/Header'
import { useState, useEffect } from 'react'
import {HomePage} from '../../pages/Home_page/HomePage'
import {Footer} from '../Footer/Footer'
import { Route, Routes, useNavigate } from "react-router-dom";
import { MusicPage } from '../../pages/MusicPage/MusicPage';
import { TextsPage } from '../../pages/TextsPage/TextsPage';
import { Register } from '../Auth/Register';
import {getAuth, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { SignIn } from '../Auth/SignIn.jsx';
import { UserSettings } from '../Auth/UserSettings.jsx';
import { ResetPassword } from '../Auth/ResetPassword.jsx';


function App() {

const [langEn, setLangEn] = useState(true);
const [currentUser, setCurrentUser] = useState('')
const [showModal, setShowModal] = useState(false);

const navigate = useNavigate()

// Логика для аутентификации

const [user] = useAuthState(auth);

const onSignOut = async () => {
  await signOut(auth).then(() => {
    navigate('/');
    setCurrentUser('')
  }).catch((error) => {
    console.log(error)
  });
  }


  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user.displayName)
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      }







useEffect(()=>{
  if (user !== null) {setCurrentUser(user)}
  else return

}, [user])


return (
  <>
    <Header langEn={langEn} setLangEn={setLangEn} currentUser={currentUser} user={user} onSignOut={onSignOut} />
      <main className='main_content_container'>

      <Routes>
        <Route path='/' element={<HomePage langEn={langEn} setLangEn={setLangEn} />}></Route> 
        <Route path='/music' element={<MusicPage langEn={langEn}/>}></Route>
        <Route path='/texts' element={<TextsPage langEn={langEn}/>}></Route>
        <Route path='/register' element={<Register langEn={langEn} currentUser={currentUser} setCurrentUser={setCurrentUser} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/user-settings' element={<UserSettings showModal={showModal} setShowModal={setShowModal} onSignOut={onSignOut}  currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
        <Route path='/sign-in' element={<SignIn langEn={langEn} signInWithGoogle={signInWithGoogle}/>}></Route>
        <Route path='/password-reset' element={<ResetPassword langEn={langEn}/>}></Route>       
      </Routes>
    </main>
    <Footer/>
  </>
  );
}

export default App;
