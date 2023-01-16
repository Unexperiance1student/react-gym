import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const options = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async function (url) {
    const { data } = await axios.get(
      `https://exercisedb.p.rapidapi.com/${url}`,
      options
    );
    return data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  'exercises/fetchAllCategories',
  async function (url) {
    const { data } = await axios.get(
      `https://exercisedb.p.rapidapi.com/${url}`,
      options
    );

    return data;
  }
);

const initialState = {
  isExercisesLoading: false,
  allExercises: [],
  bodyPart: 'all',
  allBodyParts: [],
  exercisesError: null,
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setBodyPart(state, action) {
      state.bodyPart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isExercisesLoading = true;
        state.postError = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.allBodyParts = action.payload;
      })
      .addCase(fetchExercises.pending, (state) => {
        state.isExercisesLoading = true;
        state.postError = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.allExercises = action.payload;
      })
      .addMatcher(ispostError, (state, action) => {
        state.exercisesError = action.error.name;
        state.isExercisesLoading = false;
      });
  },
});

function ispostError(action) {
  return action.type.endsWith('rejected');
}

export default exercisesSlice.reducer;
export const { setBodyPart } = exercisesSlice.actions;
