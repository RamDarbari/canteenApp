import { createAction, props } from '@ngrx/store';
import { data, login } from 'src/data';

export const login1 = createAction(
  '[Auth] Login',
  props<{ loginData: login }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: data }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const mealFetching = createAction(
  '[Meal] meal',
  props<{ meal: string }>()
);

export const mealFetchSuccessfully = createAction(
  '[Meal] Fetch Meals Successfully',
  props<{ meal: data }>()
);
export const mealFetchFailure = createAction(
  '[Meal] Fetching Meal Got An Failure',
  props<{ error: string }>()
);
