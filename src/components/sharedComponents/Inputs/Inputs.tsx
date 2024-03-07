import * as _React from 'react';
//^^ import React from 'react'; other way if you are getting red squiggles from above way
import { forwardRef } from 'react'; 
//^^ Allows component forms to forward the information/data coming from user
import { TextField } from '@mui/material'; 


interface inputState {
    name: string,
    placeholder: string
}



export const InputText = forwardRef((project: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref}
            fullWidth
            type = 'text'
            {...project}
        >
        </TextField>
    )
})

export const InputPassword = forwardRef((project: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            // Data coming from user submit-all and will be forwarded to the form using this input box
            inputRef={ref}
            fullWidth
            type = 'password'
            {...project}
        >
        </TextField>
    )
})