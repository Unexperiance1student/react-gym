import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  const { gifUrl, name, bodyPart, target, id } = exercise;
  return (
    <Link
      className='exercise-card'
      to={`/exercise/${id}`}>
      <img
        src={gifUrl}
        alt={name}
        loading='lazy'
      />
      <Stack direction='row'>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#ffa9a9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}>
          {bodyPart}
        </Button>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#fcc757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}>
          {target}
        </Button>
      </Stack>
      <Typography
        ml='21px'
        color='#000'
        fontWeight='bold'
        fontSize='22px'
        mt='11px'
        pb='10px'
        textTransform='capitalize'>
        {name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
