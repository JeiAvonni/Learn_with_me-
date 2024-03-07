import * as _React from 'react';
// Use state in react hook
import { useState } from 'react';
import {
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Stack, // Flexbox
    Typography,
    Divider, // A line
    CssBaseline,
    Box // Div 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { signOut, getAuth } from 'firebase/auth';




// Internal imports
import { theme } from '../../../Theme/themes';


// Css dict
const drawerWidth = 200;


const navStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            //^^ Number 
            duration: theme.transitions.duration.leavingScreen
            // ^^ String calculation of the duration
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            //^^ Number 
            duration: theme.transitions.duration.enteringScreen
            //^^ String calculation of the duration
        })
    },
    menuButton: {
        // default to 8px * 2 = 16px
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(1),
        // Spread operator ... grabing the properties from the default toolbar in theme
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    toolbar: {
        display: 'flex'
    },
    toolbarButton: {
        marginLeft: 'auto',
        color: theme.palette.primary.contrastText
    },
    signInStack: {
        position: 'absolute',
        top: '20%',
        right: '50px'
    }
}

export const NavBar = () => {
    // Setup for hooks & variables
    const [open, setOpen] = useState(false)

    //^^ Setting initial state to false as in NOT open
    const navigate = useNavigate();

    // grabbing our auth boolean whether or not someone is signed in
    const myAuth = localStorage.getItem('auth')
    const auth = getAuth();

    // 2 functions to help us set our hook
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    // list of dictionary/object for our NavLinks

    const navLinks = [
        {
            text: 'Home',
            icon: ' ',
            onClick: () => navigate('/')
        },
        {
            text: 'Mastered',
            icon: ' ',
            onClick: () => navigate('/mastered')
        },
        {
            text: 'Collection',
            icon: <SpellcheckIcon/>,
            onClick: () => navigate('/collection')
        }
    ]

    let signInText = 'Sign In'
       // ADD THIS
    if (myAuth === 'true') { 
         signInText = 'Sign Out'
    }
 //ADD THIS
    const signInButton = async () => {
        if (myAuth === 'false') {
            navigate('/auth')
        } else {
            await signOut(auth)
            localStorage.setItem('auth', 'false')
            localStorage.setItem('user', '')
            localStorage.setItem('uuid', '')
            navigate('/')
        }
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                sx={open ? navStyles.appBarShift : navStyles.appBar}
                position='fixed'
            >
                <Toolbar sx={navStyles.toolbar}>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={open ? navStyles.hide : navStyles.menuButton}
                    >
                        <SchoolIcon />
                    </IconButton>
                </Toolbar>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={navStyles.signInStack} >
                    <Typography variant='body2' sx={{ color: 'inherit' }}>
                        Your're doing great! Keep learning!
                    </Typography>
                    <Button
                        variant='contained'
                        color='info'
                        size='large'
                        sx={{ marginLeft: '20px' }}
                        onClick={ signInButton }
                    >
                        {signInText}
                    </Button>
                </Stack>
            </AppBar>
            <Drawer
                sx={open ? navStyles.drawer : navStyles.hide}
                variant='persistent'
                anchor='left'
                open={open}
            //^^ Either true or false 
            >
                <Box sx={navStyles.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <SchoolIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {navLinks.map((item) => {
                        // Using variable deconstruction to deconstruct our object/dictionary
                        const { text, icon, onClick } = item;
                        return (
                            <ListItemButton key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                                {icon}
                            </ListItemButton>
                        )

                    })}
                </List>
            </Drawer>
        </Box>
    )





}