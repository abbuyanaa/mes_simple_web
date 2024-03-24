import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import global from './global';
import bas from './bas';

const combinedReducer = combineReducers({
  global,
  bas,
});

const rootReducer = (state, action) => {
  switch (action.type) {
  case HYDRATE: {
    // action.payload -> getServerSideProps 등 server에서 생성한 state를 가지고 있음
    // state -> client 에서 생성된 state
    // HYDRATE 에서 해당 2가지를 합쳐야 함!!
    // const persistUserObject = {
    //   ...state,
    //   ...action.payload,
    //   user: {
    //     user: action.payload.user.user ? action.payload.user.user : state.user.user,
    //   },
    // };
    // return persistUserObject;
    return { ...state, ...action.payload };
  }
  default: {
    return combinedReducer(state, action);
  }
  }
};

export default rootReducer;
