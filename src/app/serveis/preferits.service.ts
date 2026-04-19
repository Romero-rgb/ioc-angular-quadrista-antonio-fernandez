import { computed, Injectable, signal } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

export interface Preferit {
  element: ElementCataleg;
  notes: string[];
  dataAfegit: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PreferitsService {
  private readonly CLAU_STORAGE = 'preferits-cataleg';
  private readonly preferitsSignal = signal<Preferit[]>([]);

  readonly preferits = this.preferitsSignal.asReadonly();
  readonly totalPreferits = computed(() => this.preferitsSignal().length);

  constructor() {
    this.carregarPreferits();
  }

  private carregarPreferits(): void {
    try {
      const dades = localStorage.getItem(this.CLAU_STORAGE);

      if (!dades) {
        this.preferitsSignal.set([]);
        return;
      }

      const preferits = JSON.parse(dades) as Preferit[];
      this.preferitsSignal.set(preferits);
    } catch (error) {
      console.error('Error carregant preferits:', error);
      this.preferitsSignal.set([]);
    }
  }

  private desarPreferits(): void {
    localStorage.setItem(
      this.CLAU_STORAGE,
      JSON.stringify(this.preferitsSignal())
    );
  }

  afegirPreferit(element: ElementCataleg): void {
    if (this.esPreferit(element.id)) {
      return;
    }

     const nouPreferit: Preferit = {
      element,
      notes: [],
      dataAfegit: new Date()
    };

    this.preferitsSignal.update(preferits => [...preferits, nouPreferit]);
    this.desarPreferits();
  }

  eliminarPreferit(id: string): void {
    this.preferitsSignal.update(preferits =>
     preferits.filter(pref => pref.element.id !== id)
    );
    this.desarPreferits();
  }

  afegirNota(id: string, nota: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.element.id === id) {
          return { ...p, notes: [...p.notes, nota] };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  
  eliminarNota(id: string, indexNota: number): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.element.id === id) {
          const notesActualitzades = [...p.notes];
          notesActualitzades.splice(indexNota, 1);
          return { ...p, notes: notesActualitzades };
        }
        return p;
      })
    );
    this.desarPreferits();
  }


  esPreferit(id: string): boolean {
    return this.preferitsSignal().some(pref => pref.element.id === id);
  }

    obtenirPreferit(id: string): Preferit | undefined {
    return this.preferitsSignal().find(p => p.element.id === id);
  }

}