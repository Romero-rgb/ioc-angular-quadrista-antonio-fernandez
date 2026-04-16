import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { of } from 'rxjs';

import { ElementCataleg, ElementApiResponse } from '../models/element.model';
import {
  adaptarElementApi,
  adaptarElementsApi,
} from '../models/element.adaptador';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private readonly elementsSignal = signal<ElementCataleg[]>([]);
  private readonly carregantSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(``);

  public readonly elements = this.elementsSignal.asReadonly();
  public readonly carregant = this.carregantSignal.asReadonly();
  public readonly error = this.errorSignal.asReadonly();

  obtenirPopulars(): void {
    this.carregantSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}/elements?popular=true`)
      .pipe(
        map(adaptarElementsApi),
        tap((elements) => {
          this.elementsSignal.set(elements);
          this.carregantSignal.set(false);
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.carregantSignal.set(false);
          this.elementsSignal.set([]);
          return of([]);
        }),
      )
      .subscribe();
  }

  cercar(terme: string): void {
    if (!terme.trim()) {
      this.obtenirPopulars();
      return;
    }

    this.carregantSignal.set(true);
    this.errorSignal.set('');

    this.http
      .get<ElementApiResponse[]>('${this.apiUrl}/elements?q=${terme}')
      .pipe(
        map(adaptarElementsApi),
        tap((elements) => {
          this.elementsSignal.set(elements);
          this.carregantSignal.set(false);
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.carregantSignal.set(false);
          this.elementsSignal.set([]);
          return of([]);
        }),
      )
      .subscribe();
  }

  private gestionarError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error de xarxa: ${error.error.message}`;
    }

    return `Error del servidor (${error.status}): ${error.message}`;
  }
}
