import { configureStore } from '@reduxjs/toolkit';
import exercisesSlice from './slice/exercisesSlice';

const store = configureStore({
  reducer: {
    exercises: exercisesSlice,
  },
});

export default store;
