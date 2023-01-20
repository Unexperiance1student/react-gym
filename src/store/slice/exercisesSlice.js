import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const options = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

const youtubeOptions = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
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
export const fetchTargetExercises = createAsyncThunk(
  'exercises/fetchTargetExercises',
  async function (url) {
    const { data } = await axios.get(
      `https://exercisedb.p.rapidapi.com/${url}`,
      options
    );
    return data;
  }
);
export const fetchEquipmentExercises = createAsyncThunk(
  'exercises/fetchEquipmentExercises',
  async function (url) {
    const { data } = await axios.get(
      `https://exercisedb.p.rapidapi.com/${url}`,
      options
    );
    return data;
  }
);
export const fetchYoutubeExercises = createAsyncThunk(
  'exercises/fetchYoutubeExercises',
  async function (url) {
    const { data } = await axios.get(
      `https://youtube-search-and-download.p.rapidapi.com/${url}`,
      youtubeOptions
    );
    return data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  'exercises/fetchAllCategories',
  async function () {
    const { data } = await axios.get(
      'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
      options
    );

    return data;
  }
);

const initialState = {
  isExercisesLoading: false,
  isExercisesYoutubeLoading: false,
  allExercises: [],
  bodyPart: 'all',
  allBodyParts: ['all'],
  exercisesError: null,
  youtubeExercises: [],
  target: [],
  equipment: [],
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
        state.exercisesError = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.allBodyParts = ['all', ...action.payload];
      })
      .addCase(fetchExercises.pending, (state) => {
        state.isExercisesLoading = true;
        state.exercisesError = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.allExercises = action.payload;
      })
      .addCase(fetchEquipmentExercises.pending, (state) => {
        state.isExercisesLoading = true;
        state.exercisesError = null;
      })
      .addCase(fetchEquipmentExercises.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.equipment = action.payload;
      })
      .addCase(fetchTargetExercises.pending, (state) => {
        state.isExercisesLoading = true;
        state.exercisesError = null;
      })
      .addCase(fetchTargetExercises.fulfilled, (state, action) => {
        state.isExercisesLoading = false;
        state.target = action.payload;
      })
      .addCase(fetchYoutubeExercises.pending, (state) => {
        state.isExercisesYoutubeLoading = true;
        state.exercisesError = null;
      })
      .addCase(fetchYoutubeExercises.fulfilled, (state, action) => {
        state.isExercisesYoutubeLoading = false;
        state.youtubeExercises = action.payload;
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
