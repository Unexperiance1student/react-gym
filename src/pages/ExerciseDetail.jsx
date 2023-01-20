import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectExercises } from '../store/selectors/exercisesSelector';
import {
  fetchExercises,
  fetchYoutubeExercises,
  fetchEquipmentExercises,
  fetchTargetExercises,
} from '../store/slice/exercisesSlice';
import {
  Detail,
  ExerciseVideos,
  Loader,
  SimilarExercises,
} from '../components';

const ExerciseDetail = () => {
  const dispatch = useDispatch();
  const {
    allExercises,
    youtubeExercises,
    isExercisesLoading,
    isExercisesYoutubeLoading,
    target,
    equipment,
  } = useSelector(selectExercises);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchExercises(`exercises/exercise/${id}`));
    dispatch(
      fetchEquipmentExercises(`exercises/target/${allExercises.target}`)
    );
    dispatch(
      fetchTargetExercises(`exercises/equipment/${allExercises.equipment}`)
    );
    dispatch(
      fetchYoutubeExercises(`search?query=${allExercises.name} exercise`)
    );
  }, [id]);

  if (isExercisesLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Detail exerciseDetail={allExercises} />
      <ExerciseVideos
        exerciseVideos={youtubeExercises.contents}
        name={allExercises.name}
        isExercisesYoutubeLoading={isExercisesYoutubeLoading}
      />
      <SimilarExercises
        targetMuscleExercises={target}
        equipmentExercises={equipment}
        isExercisesLoading={isExercisesLoading}
      />
    </Box>
  );
};
export default ExerciseDetail;
