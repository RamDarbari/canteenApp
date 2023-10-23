// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import * as authActions from './actions';
// import { CommonServiceService } from 'src/app/services/common-service.service';
// import { data } from 'src/data';

// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions, private _http: CommonServiceService) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(authActions.login1),
//       switchMap((action) =>
//         this._http.userLogin(action.loginData).pipe(
//           map((user) => {
//             console.log('User Data Fetched:', user); // Log the user data
//             return authActions.loginSuccess({ user });
//           }),
//           catchError((error) => {
//             console.error('Error fetching user data:', error); // Log any errors
//             return of(authActions.loginFailure({ error: error.message }));
//           })
//         )
//       )
//     )
//   );

//   fetchMeals$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(authActions.mealFetching),
//       switchMap((action) => {
//         const token = localStorage.getItem('user')
//           ? JSON.parse(localStorage.getItem('user')).data.token
//           : null;
//         if (token) {
//           return this._http.menuList(token).pipe(
//             map((meal: data) => {
//               console.log('Meal Data Fetched:', meal); // Log the meal data
//               return authActions.mealFetchSuccessfully({ meal });
//             }),
//             catchError((error) => {
//               console.error('Error fetching meal data:', error); // Log any errors
//               return of(authActions.mealFetchFailure({ error: error.message }));
//             })
//           );
//         } else {
//           console.error('Token not available'); // Log token not available error
//           return of(
//             authActions.mealFetchFailure({ error: 'Token not available' })
//           );
//         }
//       })
//     )
//   );
// }
