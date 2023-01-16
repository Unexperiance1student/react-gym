import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { selectExercises } from '../store/selectors/exercisesSelector';
import { fetchExercises } from '../store/slice/exercisesSlice';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ setExercises, exercises }) => {
  const dispatch = useDispatch();
  const { allExercises, bodyPart, isExercisesLoading } =
    useSelector(selectExercises);

  //Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercise = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  useEffect(() => {
    let exercisesData = [];

    if (bodyPart === 'all') {
      dispatch(fetchExercises('exercises'));
      exercisesData = allExercises;
    } else {
      dispatch(fetchExercises(`exercises/bodyPart/${bodyPart}`));
      exercisesData = allExercises;
    }

    setExercises(exercisesData);
  }, [bodyPart]);

  return (
    <Box
      id='exercises'
      sx={{ mt: { lg: '110px' } }}
      mt='50px'
      p='20px'>
      <Typography
        variant='h3'
        mb='46px'>
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap='wrap'
        justifyContent='center'>
        {currentExercise.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
          />
        ))}
      </Stack>
      <Stack
        mt='100px'
        alignItems='center'>
        {exercises.length > 9 && (
          <Pagination
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size='large'
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
