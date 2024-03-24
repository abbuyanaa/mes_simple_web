import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

const name = 'mat';

const initialState = {
  list: [],
  detail: null,
};

export const matListRequest = createAction(`${name}/matListRequest`);
export const matListSuccess = createAction(`${name}/matListSuccess`);

export const matDetailRequest = createAction(`${name}/matDetailRequest`);

export const matSaveRequest = createAction(`${name}/matSaveRequest`);
export const matSaveSuccess = createAction(`${name}/matSaveSuccess`);

export const matUpdateRequest = createAction(`${name}/matUpdateRequest`);
export const matUpdateSuccess = createAction(`${name}/matUpdateSuccess`);

export const matDeleteRequest = createAction(`${name}/matDeleteRequest`);
export const matDeleteSuccess = createAction(`${name}/matDeleteSuccess`);

const matSlice = createSlice({
  name,
  initialState,
  reducers: {
    matListSuccess: (state, action) => {
      state.list = action.payload;
    },
    matDetailSuccess: (state, action) => {
      state.detail = action.payload || null;
    },
    matUpdateSuccess: (state, action) => {
      state.list = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          matListSuccess,
          matSaveSuccess,
          matUpdateSuccess,
          matDeleteSuccess,
        ),
        (state, action) => {
          state.list = action.payload;
        },
      );
  },
});

export const {
  matDetailSuccess,
} = matSlice.actions;

export default matSlice.reducer;
