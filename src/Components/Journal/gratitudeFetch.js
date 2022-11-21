// fetch and return one gratitude question from Gratitude Questions API
const options = {
  method: 'GET',
  headers: {
    // 'X-RapidAPI-Key': '4ea22d6f7fmsh7703c9431b9367dp14675cjsnb1f08b5e6743',
    'X-RapidAPI-Host': 'gratitude-questions.p.rapidapi.com',
  },
};

/* this function is called from within useEffect in the Journal component. 
It sends request to Gratitude Questions API and returns a promise that resolves to the JSON or error object */
export const getQuestion = async () => {
  try {
    const response = await fetch(
      'https://gratitude-questions.p.rapidapi.com/question',
      options
    );
    if (response.ok) {
      return await response.json();
    }
    throw response;
  } catch (err) {
    return err;
  }
};
