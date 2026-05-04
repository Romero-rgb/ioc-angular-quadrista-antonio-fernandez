import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, delay, map } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private actualUser$ = new BehaviorSubject<User | null>(null);

    isAutenthicate(): boolean {
        return this.actualUser$.value !== null;
    }

    giveUser(): Observable<User | null> {
        return this.actualUser$.asObservable();
    }

    login(email: string, password: string): boolean {
        if(email ==='admin@test.com' && password ==='1234') {
            this.actualUser$.next({id: 1, nom: 'Admin', email, rol: 'admin'});
            return true;
        }
        return false;
    }

    logout(): void {
        this.actualUser$.next(null);
    }

}