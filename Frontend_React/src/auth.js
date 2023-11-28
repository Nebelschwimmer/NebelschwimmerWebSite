// import {getAuth, updateProfile,  signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, 
//   sendPasswordResetEmail } from 'firebase/auth'

  

// const auth = getAuth();
// const user = auth.currentUser;

// // Для входа через аккаунт Гугл
// export const SignInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log(user.displayName)
//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       const email = error.customData.email;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//     });
//   }

// // Для регистрации через email и пароль

// export async function RegisterWithEmailPassword(email, password) {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       userCredential.user.sendEmailVerification();
//       auth.signOut();
//       alert("Email sent");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
      
//     });
  
// }

// // Для обновления пользователя
// // export async  function UpdateUser (userName, avatarURL) {
// //   await updateProfile(auth.currentUser, {
// //     displayName: userName, photoURL: avatarURL
// //   }).then(() => {
// //     const newUser = auth.currentUser;
// //     console.log(newUser)
// //     return newUser
// //   }).catch((error) => {
// //     console.log(error.message)
// //   });
// // }
// // Вход по логину и паролю
// export async function SingInWithEmailAndPassword (email, password) {

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log('Signed in!')
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode, errorMessage)
//   });
// }

// export async function ResetPasswordViaEmail (email) {
//   sendPasswordResetEmail(auth, email)
//   .then(() => {
//     alert('Password reset email sent!')
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorCode, errorMessage)
//   });

//   }


