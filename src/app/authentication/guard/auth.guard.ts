import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authenticationsService = inject(CommonServiceService);
  const router = inject(Router);
  const userDataString = localStorage.getItem('user');

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const token = userData.data.token;
    console.log(token);

    if (token) {
      return true;
    }
    authenticationsService.token = token;
  } else if (authenticationsService.isuserLoggedIn) {
    router.navigate(['**']);
    return true;
  } else {
    console.log('User data not found in localStorage');
    router.navigate(['**']);
    return authenticationsService.isuserLoggedIn;
  }
  return false;
};
