import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private actualUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.actualUser$.next(JSON.parse(savedUser));
    }
  }

  isAutenthicate(): boolean {
    return this.actualUser$.value !== null;
  }

  giveUser(): Observable<User | null> {
    return this.actualUser$.asObservable();
  }

  login(email: string, password: string): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      map(() => {
        if (email === 'admin@test.com' && password === '1234') {
          const usuari: User = {
            id: 1,
            nom: email.split('@')[0],
            email,
            rol: email.includes('admin') ? 'admin' : 'usuari',
          };
          this.actualUser$.next(usuari);
          localStorage.setItem('user', JSON.stringify(usuari));
          return true;
        } else if (email === 'user@test.com' && password === '1234') {
          const usuari: User = {
            id: 1,
            nom: email.split('@')[0],
            email,
            rol: email.includes('admin') ? 'admin' : 'usuari',
          };
          this.actualUser$.next(usuari);
          localStorage.setItem('user', JSON.stringify(usuari));
          return true;
        }
        return false;
      }),
    );
  }

  logout(): void {
    this.actualUser$.next(null);
    localStorage.removeItem('user');
  }

  isAdmin(): boolean {
    return this.actualUser$.value?.rol === 'admin';
  }
}
