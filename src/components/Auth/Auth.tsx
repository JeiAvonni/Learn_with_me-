import * as _React from 'react';
import { useState } from 'react'; 
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Stack,
    Snackbar,
    CircularProgress,
    Dialog, 
    DialogContent,
    Alert
} from '@mui/material'


// internal imports
import { NavBar, InputText, InputPassword } from '../sharedComponents';
import looneytunesbaby from '../../assets/Image/looneytunesbaby.jpg'; 


// CSS styling

const authStyles = {
    main: {
        backgroundImage: `linear-gradient(rgba(0,0,0, .3), rgba(0,0,0,.5)), url(${looneytunesbaby})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px',
        position: 'absolute',
        marginTop: '10px'
    },
    stack: {
        width: '400px',
        marginTop: '100px',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'orange'
    },
    button: {
        width: '175px',
        fontSize: '14px'
    }
}

// Created Inteerfaces
interface Props {
    title: string
}

interface ButtonProps {
    open: boolean
    onClick: () => void
}


interface SubmitProps {
    email: string
    password: string
}


// Alert typess
export type MessageType = 'error' | 'warning' | 'info' | 'success'


// Google Button
const GoogleButton = (_props: ButtonProps ) => {
    // Set up for hooks 
    // Initial state always false
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    // Monitor for authentication
    const auth = getAuth()
    const [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)
    
    
    // Sign in function
    const signIn = async () => {
        await signInWithGoogle()
        
        
        //Local storage
        localStorage.setItem('auth', 'true')
        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                // Navbar use
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                //^^ Will be passed into API call
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                
                setTimeout(() => navigate('/shop'), 5000) 
            }
        })
        
        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }
        
        if (loading) {
            return <CircularProgress />
        }
    }
    
    
    return (
        <Box>
            <Button
                variant='contained'
                color='info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
               Sign In With Google 
            </Button>
            <Snackbar
                open = { open }
                autoHideDuration={5000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = { messageType }>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignIn = () => {
    // Hook setup
    // Setting to false
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    // Monitoring authentication. Grabbing auth object once it changes
    const auth = getAuth()
    const { register, handleSubmit } = useForm<SubmitProps>()
    
    
    // onSubmit functionality
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    
    
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignUp = () => {
    // Hook setup
    // Setting to false
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    // ^ Auth monitor
    const { register, handleSubmit } = useForm<SubmitProps>()
    
    
    // onSubmit functionality
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    
    
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Ready to learn? Sign up for free to keep your progress!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


export const Auth = (props: Props) => {
    // Hook setup
    const [ open, setOpen ] = useState(false)
    //^ Signup/in 
    const [ signType, setSignType ] = useState<'signin' | 'signup'>()
    
    return (
        <Box>
            <NavBar />
            <Box sx={authStyles.main }>
                <Stack
                    direction='column'
                    alignItems='center'
                    textAlign='center'
                    sx={authStyles.stack}
                >
                    <Typography variant='h2'>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        Keep track of your mastered work here!
                    </Typography>
                    <br />
                    <GoogleButton open={open} onClick={ () => setOpen(false)} />
                    <br />
                    <Stack
                        width='100%'
                        alignItems='center'
                        justifyContent='center'
                        direction='row'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button }
                            onClick = { () => { setOpen(true); setSignType('signin') } }
                        >
                            Email Login
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button }
                            onClick = { () => { setOpen(true); setSignType('signup') } }
                        >
                            Email Signup
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = { () => setOpen(false) }>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn /> : <SignUp /> }
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )
}