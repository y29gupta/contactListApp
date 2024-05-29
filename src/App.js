
// import { Button, Grid } from '@mui/material';
import ContactTable from './component/ContactTable';
import {  useDispatch, useSelector } from 'react-redux';
import ContactForm from './component/ContactForm';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';


function App() {
  const {contacts}=useSelector(state=>state.contactSlice)
  const [update,setUpdate]=useState(null)
  console.log(update,"upd")



  return (
    <>
      <ToastContainer />
   
      <ContactForm update={update} setUpdate={setUpdate}/>
      <ContactTable contactList={contacts} setUpdate={setUpdate}/>
   
    </>
  );
}

export default App;
