import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContacts, toggleform, updateContact } from '../redux/contactSlice'

const ContactForm = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        backgroundColor: 'white',
        padding: "10px",
        boxShadow: 24,
        p: 4,
    }
    const [ contact, setContact ] = useState({
        name: "",
        number: "",
        type: "",
        gender: ""

    })
    const { formOpen } = useSelector((state) => state.contactSlice)

    const dispatch = useDispatch()
    useEffect(()=>{
        if(props.update){

            setContact(props.update)
        }
       
        
    },[props.update,dispatch])
   

    const handleClose = () => {
        dispatch(toggleform())
        setContact(null)
    }

    const handleChange=(e)=>{
        console.log( e.target.value,"change")
        setContact({...contact,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(contact.id){
            dispatch(updateContact(contact))
            dispatch(toggleform())
            setContact(null)
            props.setUpdate(null)
            console.log(contact,'log')
        }else{

            console.log( contact,'check')
            dispatch(addContacts(contact))
            setContact("")
        }
    }

    return (
        <>

            <Modal
                open={formOpen}
                onClose={handleClose}

            >

                <form >

                    <Box component="form" style={style}>
                        <h2 style={{ textAlign: "center" }}>Add Contact</h2>
                        <TextField
                            label="Name"
                            name="name"
                            value={contact?.name}
                            onChange={handleChange}
                            size='small'
                            required
                            fullWidth
                            margin="normal"
                            type='text'
                        />
                        <TextField
                            label="number"
                            name="number"
                            value={contact?.number}
                            onChange={handleChange}
                            size='small'
                            required
                            fullWidth
                            margin="normal"
                            type='number'
                        />
                        <FormControl  fullWidth margin="normal" size='small' name="type">
                            <InputLabel label="type">Type</InputLabel>
                            <Select  value={contact?.type} label="Type" name="type" onChange={handleChange}>
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl name="gender" size='small' fullWidth margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select value={contact?.gender} label="Gender" name="gender"  onChange={handleChange}>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                       
                        <Button onClick={handleClose} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                            Cancel
                        </Button>
                       
                    </Box>
                </form>
            </Modal>


        </>
    )
}

export default ContactForm