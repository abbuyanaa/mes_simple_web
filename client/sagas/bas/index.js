import { fork, all } from 'redux-saga/effects';
import rawMatSaga from './rawMat';
import matSaga from './mat';

export default function* rootSaga() {
  yield all([
    fork(rawMatSaga),
    fork(matSaga),
  ]);
}
