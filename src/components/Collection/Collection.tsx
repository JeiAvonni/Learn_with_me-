// React imports
import * as _React from 'react';
import { useState } from 'react';
import { serverCalls } from '../../API';
import { Typography, Box, Button } from '@mui/material';
import { getDatabase, ref, push } from 'firebase/database';

function LearnWordForm() {
    const [word, setWord] = useState('');
    const [espanol, setEspanol] = useState('');
    const db = getDatabase();
    const handleChange = (event: { target: { value: _React.SetStateAction<string>; }; }) => {
      setWord(event.target.value);
    };
  
    const handleSubmit = async(event: { preventDefault: () => void; }) => {
      event.preventDefault();
      // Here you can perform actions with the word, such as sending it to an API, storing it in state, etc.
      console.log('Word to learn:', word);
      // Reset the input after submission
      let learn = await serverCalls.getShop(word)
      setEspanol(learn as string) ;
    //   setWord('');

    };

    // Functions
    function setCollection() {
        const userId = localStorage.getItem('uuid'); // user id so it can be specific to a user
        const collectionRef = ref(db, `collections/${userId}/`); // how we store it in the database 

        const data = {
            'english': word,
            'spanish': espanol
        }
        push(collectionRef, data)
        .then(()=> {
            console.log(data)
            setTimeout(()=> window.location.reload(), 2000)
        })
        .catch((error) => {
            console.log(error)
        });
    }

  

    return (
        <Box>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', width: '1000px'}}>
        <Typography variant='h5' sx={{ marginRight: '20px'}}>
          What new word would you like to learn today?
          <input
            type="text"
            value={word}
            onChange={handleChange}
            placeholder="Enter word..."
          />
        </Typography>
        <Button type="submit">Learn</Button>
      </form>
      <Typography variant="h5">Word of choice: {word}</Typography>
      <Typography variant='h5'>Word of choice in Espanol: {espanol}</Typography>
        {/* button refer to add to cart, for displaying to database refer to cart */}
        <Button
            variant='outlined'
            size='medium'
            onClick = { () => { setCollection() } }
                                    >
            Add to Mastered collection
        </Button>
      </Box>
      
    );
  }
// Exports
export const Collection = () => {
  
    // This is where you need to PULL the data from the database (refer to useEffect/onValue function in Cart component)
    return (
        
        <div>
            <LearnWordForm/>
            <h1 style={{marginTop: '50px'}}> This is your collection!</h1>
            {/* This is where you will map over your words coming from the databaase & display them */}
            {/* Refer to currentCart.map in the Cart return/html */}
        </div>
    )

}