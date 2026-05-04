import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  private preferits: Item[] = [];

  getPreferits(): Item[] {
    return this.preferits;
  }

  addPreferit(item: Item) {
    const exists = this.preferits.some(p => p.id === item.id);
    if (!exists) {
      this.preferits.push(item);
    }
  }

  removePreferit(id: number) {
    this.preferits = this.preferits.filter(p => p.id !== id);
  }
}