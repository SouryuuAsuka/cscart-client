import { ActiveFilter, Filter } from "@/types";

export interface AppState {
  loading: boolean | null;
  filters: Filter[];
  activeFilters: ActiveFilter[]
  resetFilters: number;
  pictureFilters: any[];
}

const initialState: AppState = {
  loading: true,
  filters: [],
  activeFilters: [],
  resetFilters: 0,
  pictureFilters: [{
    unique_id: 1,
    list_variants: [
      {
        unique_id: 2,
        icons: ['👟']
      },
      {
        unique_id: 4,
        icons: ['⭐']
      },
    ]
  }]
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
        filters: action.payload,
      };
    case 'SET_ACTIVE_FILTERS':
      return {
        ...state,
        activeFilters: action.payload,
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        resetFilters: ++state.resetFilters,
      };
    default:
      return state;
  }
};