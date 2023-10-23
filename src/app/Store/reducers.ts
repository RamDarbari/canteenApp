import { createReducer, on } from '@ngrx/store';
import { initialAuthState, initialMealState } from './state';
import * as action from '../Store/actions';
import { data } from 'src/data';

export const authReducer = createReducer(
  initialAuthState,
  on(action.loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(action.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error,
  }))
);

export const fetchMealReducer = createReducer(
  initialMealState,
  on(action.mealFetchSuccessfully, (state, { meal }) => ({
    ...state,
    mealFetched: true,
    meal,
  })),
  on(action.mealFetchFailure, (state, { error }) => ({
    ...state,
    mealError: true,
    error,
  }))
);
