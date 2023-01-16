import axios from 'axios';

export const BASE_URL = 'https://exercisedb.p.rapidapi.com';

const options = {
  headers: {
    'X-RapidAPI-Key': '99eae3ab46msh6f6966e456b056fp14468cjsn763f37c567dd',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchData = async (url) => {
  const data = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
