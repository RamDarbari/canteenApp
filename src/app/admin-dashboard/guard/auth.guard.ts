import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userRole = JSON.parse(localStorage.getItem('user'))?.data.empDetails
    .role;

  if (userRole === 'admin') {
    return true;
  } else {
    // Navigate to 'notfound' route if the user is not an admin
    return false;
  }
};
