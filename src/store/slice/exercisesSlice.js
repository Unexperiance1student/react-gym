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
  async function (url, { rejectWithValue }) {
    const data = await axios.get(
      `https://exercisedb.p.rapidapi.com/${url}`,
      options
    );

    if (!data.ok) {
      return rejectWithValue('Server Error!');
    }
    return data;
  }
);

const initialState = {
  isExercisesLoading: false,
  exercises: [],
  bodyPart: 'all',
  exercisesError: null,
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.isExercisesLoading = true;
        state.postError = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.exercises = action.payload;
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
export const {} = exercisesSlice.actions;
