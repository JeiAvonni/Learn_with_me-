// React imports
import * as _React from 'react';
import { useState, useEffect } from 'react';
import { serverCalls } from '../../API';
import { Typography, Box, Button, Stack } from '@mui/material';
import { getDatabase, ref, push, onValue, off, update, remove } from 'firebase/database';

//internal imports
// import {NavBar } from '../sharedComponents';
// import { theme } from '../../Theme/themes';
// import { MessageType } from '../Auth'; 
// import { Key } from '@mui/icons-material';
// import { objectShallowCompare } from '@mui/x-data-grid/hooks/utils/useGridSelector';


function LearnWordForm() {
  const [word, setWord] = useState('');
  const [espanol, setEspanol] = useState('');
  const db = getDatabase();
  const handleChange = (event: { target: { value: _React.SetStateAction<string>; }; }) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Here you can perform actions with the word, such as sending it to an API, storing it in state, etc.
    console.log('Word to learn:', word);
    // Reset the input after submission
    let learn = await serverCalls.getShop(word)
    setEspanol(learn as string);
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
      .then(() => {
        console.log(data)
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch((error) => {
        console.log(error)
      });
  }



  function setlearn() {
    throw new Error('Function not implemented.');
  }

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', width: '1000px' }}>
        <Typography variant='h4' sx={{ marginRight: '50px' }}>
          What new word would you like to learn today?
          <input
            type="text"
            value={word}
            onChange={handleChange}
            placeholder="Enter word to translate..."
          />
        </Typography>
        <Button 
        variant="outline"
        type="submit" 
        onClick={() => { setlearn() }}> Learn/Translate </Button>
      </form>
      
      <Typography variant="h5">Word of choice: {word}</Typography>
      
      <Typography variant='h5'>Word of choice in Espanol: {espanol}</Typography>
      {/* button refer to add to cart, for displaying to database refer to cart */}
      <Button
        variant='outlined'
        size='medium'
        onClick={() => { setCollection() }}
      >
        Confident
      </Button>
    </Box>

  );
}

// Exports
export const Collection = () => {
  const userId = localStorage.getItem('uuid'); // user id so it can be specific to a user
  const db = getDatabase();
  const collectionRef = ref(db, `collections/${userId}/`); // how we store it in the database 
  const [wordsList, setCurrentCollection] = useState([]);

  useEffect(() => {

    // onValue for monitoring changes in our cart
    onValue(collectionRef, (snapshot: { val: () => any; }) => {
      const data = snapshot.val() // grabbing data from mastered subject

      let collectionList = [] // creates empty list to hold mastered subjects

      if (data) {
        for (const [Key, value] of Object.entries(data)) {
          let masteredItem = value as any
          masteredItem['id'] = Key as string
          collectionList.push(masteredItem)
        }
      }
      setCurrentCollection(collectionList as [])
    })

    return () => {
      off(collectionRef)
    }
  }, [])


  // This is where you need to PULL the data from the database (refer to useEffect/onValue function in Cart component)
  return (

    <div>
      <LearnWordForm />
      <h1 style={{ marginTop: '50px' }}> Here is your translation of your words!</h1>
      {wordsList.map((word: any, index: number) => (
        <Typography>
          {word.spanish,word.english}
        </Typography>
      ))}
    </div>
  )

}