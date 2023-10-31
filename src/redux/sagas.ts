import Api from '@/services/api';
import { ActiveFilter, Filter } from '@/types';
import { call, put, throttle, all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    helloSaga(),
    watchGetFilters()
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

export const setFilters = (data: Filter[]) => {
  return { type: 'SET_FILTERS', payload: data }
}
export const setActiveFilters = (data: ActiveFilter[]) => {
  return { type: 'SET_ACTIVE_FILTERS', payload: data }
}
export function* watchGetFilters(): any {
  yield throttle(1000, 'GET_FILTERS', getFiltersAnync)
};
export const getFilters = () => {
  return { type: 'GET_FILTERS'}
}
export const resetFilters = () => {
  return { type: 'RESET_FILTERS'}
}
function* getFiltersAnync(): any {
  try{
    const {data} = yield call(Api.get, '/filters.json');
    console.log(data);
    yield put(setFilters(data));
  } catch (err) {
    console.log(err);
  }}