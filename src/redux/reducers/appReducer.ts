import { Filter } from "@/types";

export interface AppState {
  loading: boolean | null;
  filters: Filter[]
}

const initialState: AppState = {
  loading: true,
  filters: []
};

export const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_APP_NOT_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
};