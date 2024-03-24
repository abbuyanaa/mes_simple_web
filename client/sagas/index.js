import { fork, all } from 'redux-saga/effects';
// , take, select
import basSaga from './bas';

// function* watchAndLog() {
//   while (true) {
//     // 모든 액션 대기
//     const action = yield take('*');
//     // action이 반환되고 난뒤의 로직 작성...
//     // state 통째로
//     const state = yield select();
//     // state를 받고 난 뒤의 로직 작성..
//     console.log('WatchAndLog - action : ', action);
//     console.log('WatchAndLog - state : ', state);
//   }
// }

export default function* rootSaga() {
  yield all([
    // fork(watchAndLog),
    fork(basSaga),
  ]);
}
