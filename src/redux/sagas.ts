import { call, put, throttle, all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    helloSaga(),
  ])
}

function* helloSaga() {
  console.log('Hello Sagas!')
}
const setAppLoading = () => {
  return { type: 'SET_APP_LOADING' }
};

export const setAppNotLoading = () => {
  return { type: 'SET_APP_NOT_LOADING' }
};
