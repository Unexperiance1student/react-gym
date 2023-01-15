import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Exercises, HeroBanner, SearchExercises } from '../components';

const Home = () => {
  const [first, setfirst] = useState();
  return (
    <Box>
      <HeroBanner />
      <SearchExercises />
      <Exercises />
    </Box>
  );
};
export default Home;
