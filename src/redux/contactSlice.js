import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    formOpen: false,
    contacts: localStorage.getItem("contact") ? JSON.parse(localStorage.getItem("contact")) : [],
}



const contactSlice = createSlice({
    name: "contactSlice",
    initialState,
    reducers: {
        toggleform: (state) => {
            state.formOpen = !state.formOpen
        },
        addContacts: (state, action) => {
            state.formOpen = !state.formOpen
            state.contacts.push({ ...action.payload, id: Date.now() })
            localStorage.setItem("contact", JSON.stringify(state.contacts))
           
        },
        deleteContact: (state, action) => {
           
            const updated = state.contacts.filter((item) => item.id !== action.payload.id)
            state.contacts = updated
            localStorage.setItem('contact', JSON.stringify(state.contacts))

        },
        updateContact:(state,action)=>{
            const index=state.contacts.findIndex(item=>item.id==action.payload.id)
            if(index !== -1){
                state.contacts[index]=action.payload
                localStorage.setItem('contact', JSON.stringify(state.contacts))
                console.log(action.payload,"payload")
            }
        }
    }
})
export const { toggleform, addContacts, updateContact,deleteContact } = contactSlice.actions;
export default contactSlice.reducer