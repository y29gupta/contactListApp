import { Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteContact, toggleform, updateContact } from '../redux/contactSlice'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ContactTable = ({ contactList ,setUpdate}) => {
    const {contacts}=useSelector(state=>state.contactSlice)
    const [male,setMale]=useState()
    const [female,setFemale]=useState()
    const [business,setBusiness]=useState()
    const [personal,setPersonal]=useState()



    const header={
     
        fontWeight:"600"

    }

    const dispatch = useDispatch()
    const edit=(update)=>{
        dispatch(toggleform())
        setUpdate(update)
    }
    useEffect(()=>{
        if(contacts){
           
            const maleContacts = contacts.filter((contact) => contact.gender === 'male').length;
            setMale(maleContacts)
            const femaleContacts = contacts.filter((contact) => contact.gender === 'female').length;
            setFemale(femaleContacts)
            const personalContacts = contacts.filter((contact) => contact.type === 'personal').length;
            setPersonal(personalContacts)
            const businessContacts = contacts.filter((contact) => contact.type === 'business').length;
            setBusiness(businessContacts)
          
        }
    },[contacts])

    return (
        <>
            <Container sx={{  m: 5 }} >
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography style={header}>Personal Contacts : {personal} </Typography>
                        <Typography style={header}>Busniess Contacts : {business} </Typography>
                        <Typography style={header}>Male : {male} </Typography>
                        <Typography style={header}>Female : {female} </Typography>
                    </Grid>
                    <Grid item>

                <Button
                    sx={{
                        mb: 3,
                        float: "right"
                    }}
                    variant='contained' mt={5} size='small' onClick={() => dispatch(toggleform())}>Add Contact</Button>
                    </Grid>
                </Grid>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' sx={{ fontWeight: "bold" }}> Name</TableCell>
                                <TableCell align='center' sx={{ fontWeight: "bold" }}> Contact Number</TableCell>
                                <TableCell align='center' sx={{ fontWeight: "bold" }}> Contact Type </TableCell>
                                <TableCell align='center' sx={{ fontWeight: "bold" }}> Gender </TableCell>
                                <TableCell align='center' sx={{ fontWeight: "bold" }}> Action </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                contactList?.map((item) => (

                                    <TableRow>

                                        <TableCell align='center'>{item?.name}</TableCell>
                                        <TableCell align='center'>{item?.number}</TableCell>
                                        <TableCell align='center'>{item.type}</TableCell>
                                        <TableCell align='center'>{item.gender}</TableCell>
                                        <TableCell  align='center'>
                                            <IconButton>

                                            <EditIcon style={{color:"orange"}} onClick={()=>edit(item)}/>
                                            </IconButton>
                                            <IconButton onClick={()=>dispatch(deleteContact(item))}>

                                            <DeleteForeverIcon style={{color:"red"}}/>
                                            </IconButton>
                                            
                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>
    )
}

export default ContactTable