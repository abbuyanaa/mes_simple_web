import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

const name = 'rawMat';

const initialState = {
  list: [],
  detail: null,
};

export const rawMatListRequest = createAction(`${name}/rawMatListRequest`);
export const rawMatListSuccess = createAction(`${name}/rawMatListSuccess`);

export const rawMatDetailRequest = createAction(`${name}/rawMatDetailRequest`);

export const rawMatSaveRequest = createAction(`${name}/rawMatSaveRequest`);
export const rawMatSaveSuccess = createAction(`${name}/rawMatSaveSuccess`);

export const rawMatUpdateRequest = createAction(`${name}/rawMatUpdateRequest`);
export const rawMatUpdateSuccess = createAction(`${name}/rawMatUpdateSuccess`);

export const rawMatDeleteRequest = createAction(`${name}/rawMatDeleteRequest`);
export const rawMatDeleteSuccess = createAction(`${name}/rawMatDeleteSuccess`);

const rawMatSlice = createSlice({
  name,
  initialState,
  reducers: {
    rawMatListSuccess: (state, action) => {
      state.list = action.payload;
    },
    rawMatDetailSuccess: (state, action) => {
      state.detail = action.payload || null;
    },
    rawMatUpdateSuccess: (state, action) => {
      state.list = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          rawMatListSuccess,
          rawMatSaveSuccess,
          rawMatUpdateSuccess,
          rawMatDeleteSuccess,
        ),
        (state, action) => {
          state.list = action.payload;
        },
      );
  },
});

export const {
  rawMatDetailSuccess,
} = rawMatSlice.actions;

export default rawMatSlice.reducer;
