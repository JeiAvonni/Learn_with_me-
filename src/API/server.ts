let userId = localStorage.getItem('uuid') //grabbing the uuid from Google Authentication 



// putting all our API calls in a giant dictionary/object

export const serverCalls = {

    getShop: async (user: string) => {
        
        // api call consist of 1-4 things 
        // 1. url (required)
        // 2. method (optional it will default to GET)
        // 3. headers (optional but usually there) authentication type & type of data 
        // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
        
        const url = 'https://translator163.p.rapidapi.com/translate';
        const options = {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b226938cdamsh247c1449ae911b5p14ba56jsna97b793eae8c',
        'X-RapidAPI-Host': 'translator163.p.rapidapi.com'
        },
        body: {
        text: user,
        source_lang: 'en',
        target_lang: 'es'
        }
        };

        try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        } catch (error) {
        console.error(error);
        }
    }
}
