import { createSlice } from '@reduxjs/toolkit';

const name = 'global';
export const initialState = {
  loadingContent: {
    isLoading: false,
    title: '',
    message: '',
  },
  popupContent: {
    isShowing: false,
    content: '',
    redirect: '',
    shouldReplace: false,
  },
  toastContent: {
    visible: false,
    message: '',
    redirect: '',
    shouldReplace: false,
  },
};

const globalSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadingInProgress: (state, action) => {
      state.loadingContent = action.payload;
    },
    showPopup: (state, action) => {
      state.popupContent = action.payload;
    },
    showToast: (state, action) => {
      state.toastContent = action.payload;
    },
  },
});

export const {
  loadingInProgress,
  showPopup,
  showToast,
} = globalSlice.actions;

export default globalSlice.reducer;
