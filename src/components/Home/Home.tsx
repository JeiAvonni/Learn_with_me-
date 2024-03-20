// Imports
import * as _React from 'react'; 
import { styled } from '@mui/system'; 
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 

// internal imports
import projectImage from '../../assets/Image/Bugs_bunny.jpg'

import { NavBar } from '../sharedComponents';

interface Project {
    title: string
}

// Styling components
const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${projectImage});`,
    width: '100%',
    height: '98%',
    length: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 0px', 
    position: 'absolute',
    marginTop: '10px'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})
 // Desired word to learn in espanol form
 
// 1st functional based component!
export const Home = (project: Project) => {

    return (
        <Root>
            <NavBar>
                
            </NavBar>
            <Main>
                <MainText>
                    <Typography variant='h3'> { project.title }</Typography>
                    <Button sx={{ marginTop: '10px'}} component={Link} to={"/collection"} variant='contained'>Ready, Set, Learn! </Button>
                </MainText>
            </Main>
        </Root>
    )
}