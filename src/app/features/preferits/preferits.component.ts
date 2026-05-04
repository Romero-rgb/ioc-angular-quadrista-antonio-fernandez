import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from '../../core/models/item.model';
import { PreferitsService } from '../../core/services/Preferits.services';

@Component({
  selector: 'app-preferits',
  standalone: true,

  imports: [CommonModule, RouterModule],
  templateUrl: './preferits.component.html',
  styleUrl: './preferits.component.scss',
})
export class PreferitsComponent implements OnInit {
  private preferitsService = inject(PreferitsService);

  itemsPreferits: Item[] = [];

  ngOnInit() {
    this.itemsPreferits = this.preferitsService.getPreferits();
  }

  removeFromPreferits(id: number) {
    this.preferitsService.removePreferit(id);
    this.itemsPreferits = this.preferitsService.getPreferits();
  }
}
