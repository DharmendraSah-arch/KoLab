import { CanActivateFn, Router } from '@angular/router';
import { ɵɵinject } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Message } from 'ng-angular-popup/lib/toast.model';
 // Define the authGuard function, which implements CanActivateFn interface
export const authGuard: CanActivateFn = (route, state) => {
  // Use dependency injection to get an instance of the AuthService
  const authService =  ɵɵinject(AuthService);
  const router =  ɵɵinject(Router);
  const toast =  ɵɵinject(NgToastService);
 

  // Check if the user is logged in using the AuthService
  if (authService.isLoggedIn()) {
    return true; // If logged in, allow access to the route
  } else {
   // toast.error(Details="Please Login first!!",)
   alert('Please Login first!!')
  
    router.navigate(['/authentication/login']);
    return false; // If not logged in, deny access to the route
  }
};