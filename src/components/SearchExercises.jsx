import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExercises } from '../store/selectors/exercisesSelector';
import {
  fetchAllCategories,
  fetchExercises,
} from '../store/slice/exercisesSlice';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises }) => {
  const dispatch = useDispatch();
  const [bodyParts, setBodyParts] = useState([]);
  const [search, setSearch] = useState('');
  const { allExercises, allBodyParts, bodyPart, isExercisesLoading } =
    useSelector(selectExercises);
  useEffect(() => {
    dispatch(fetchAllCategories('exercises/bodyPartList'));
    setBodyParts(allBodyParts);
    console.log(allBodyParts);
  }, []);

  const handleSearch = () => {
    if (search) {
      dispatch(fetchExercises('exercises'));
      const searchedExercises = allExercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch('');
      setExercises(searchedExercises);
    }
  };
  return (
    <Stack
      alignItems='center'
      mt='37px'
      justifyContent='center'
      p='20px'>
      <Typography
        fontWeight='700'
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb='50px'
        textAlign='center'>
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box
        position='relative'
        mb='72px'>
        <TextField
          height='76px'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Search Exercises'
          type='text'
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
        />
        <Button
          className='search-btn'
          sx={{
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0',
          }}
          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={allBodyParts}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
