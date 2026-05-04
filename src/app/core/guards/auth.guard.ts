import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAutenthicate()) {
    console.log('authGuard: Autenticat')
    return true;
  }
  console.log('authGuard: No autenticat, redirigint a login')

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  
}
