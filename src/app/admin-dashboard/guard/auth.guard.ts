import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userRole = JSON.parse(localStorage.getItem('user'))?.data.empDetails
    .role;

  if (userRole === 'admin') {
    return true;
  } else {
    return false;
  }
};
