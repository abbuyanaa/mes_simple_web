import { all, call, put, takeLatest } from 'redux-saga/effects';

import { axiosAPI } from '../../api';
import { showPopup } from '../../reducers/global';
import {
  rawMatListRequest, rawMatListSuccess,
  rawMatDetailRequest, rawMatDetailSuccess,
  rawMatSaveRequest, rawMatSaveSuccess,
  rawMatUpdateRequest, rawMatUpdateSuccess,
  rawMatDeleteRequest, rawMatDeleteSuccess,
} from '../../reducers/bas/rawMat';

const API_URL = '/bas/rawMat';

function rawMatListAPI(params) {
  return axiosAPI.get(`${API_URL}/list`, { params });
}
function* rawMatList(action) {
  try {
    const result = yield call(rawMatListAPI, action.payload);
    yield put(rawMatListSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function rawMatSaveAPI(data) {
  return axiosAPI.post(`${API_URL}/insert`, data);
}
function* rawMatSave(action) {
  try {
    const result = yield call(rawMatSaveAPI, action.payload);
    yield put(rawMatSaveSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function rawMatDetailAPI(params) {
  return axiosAPI.get(`${API_URL}/detail`, { params });
}
function* rawMatDetail(action) {
  try {
    const result = yield call(rawMatDetailAPI, action.payload);
    yield put(rawMatDetailSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function rawMatUpdateAPI(data) {
  return axiosAPI.post(`${API_URL}/update`, data);
}
function* rawMatUpdate(action) {
  try {
    const result = yield call(rawMatUpdateAPI, action.payload);
    yield put(rawMatUpdateSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function rawMatDeleteAPI(data) {
  return axiosAPI.post(`${API_URL}/delete`, data);
}
function* rawMatDelete(action) {
  try {
    const result = yield call(rawMatDeleteAPI, action.payload);
    yield put(rawMatDeleteSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

export default function* inStatusSaga() {
  yield all([
    takeLatest(rawMatListRequest, rawMatList),
    takeLatest(rawMatSaveRequest, rawMatSave),
    takeLatest(rawMatDetailRequest, rawMatDetail),
    takeLatest(rawMatUpdateRequest, rawMatUpdate),
    takeLatest(rawMatDeleteRequest, rawMatDelete),
  ]);
}
