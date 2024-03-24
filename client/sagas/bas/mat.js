import { all, call, put, takeLatest } from 'redux-saga/effects';

import { axiosAPI } from '../../api';
import { showPopup } from '../../reducers/global';
import {
  matListRequest, matListSuccess,
  matDetailRequest, matDetailSuccess,
  matSaveRequest, matSaveSuccess,
  matUpdateRequest, matUpdateSuccess,
  matDeleteRequest, matDeleteSuccess,
} from '../../reducers/bas/mat';

const API_URL = '/bas/mat';

function matListAPI(params) {
  return axiosAPI.get(`${API_URL}/list`, { params });
}
function* matList(action) {
  try {
    const result = yield call(matListAPI, action.payload);
    yield put(matListSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function matSaveAPI(data) {
  return axiosAPI.post(`${API_URL}/insert`, data);
}
function* matSave(action) {
  try {
    const result = yield call(matSaveAPI, action.payload);
    yield put(matSaveSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function matDetailAPI(params) {
  return axiosAPI.get(`${API_URL}/detail`, { params });
}
function* matDetail(action) {
  try {
    const result = yield call(matDetailAPI, action.payload);
    yield put(matDetailSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function matUpdateAPI(data) {
  return axiosAPI.post(`${API_URL}/update`, data);
}
function* matUpdate(action) {
  try {
    const result = yield call(matUpdateAPI, action.payload);
    yield put(matUpdateSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(showPopup({
      isShowing: true,
      content: error.response?.data || '',
      redirect: '/',
    }));
  }
}

function matDeleteAPI(data) {
  return axiosAPI.post(`${API_URL}/delete`, data);
}
function* matDelete(action) {
  try {
    const result = yield call(matDeleteAPI, action.payload);
    yield put(matDeleteSuccess(result.data));
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
    takeLatest(matListRequest, matList),
    takeLatest(matSaveRequest, matSave),
    takeLatest(matDetailRequest, matDetail),
    takeLatest(matUpdateRequest, matUpdate),
    takeLatest(matDeleteRequest, matDelete),
  ]);
}
