import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-cataleg-page',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './cataleg-page.component.html',
  styleUrl: './cataleg-page.component.scss',
})
export class CatalegPageComponent implements OnInit {
  private itemService = inject(ItemService);
  private router = inject(Router);

  items: Item[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.itemService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error carregant elements';
        this.loading = false;
        console.error(err);
      },
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/detall', id]);
  }

  trackByItemId(index: number, item: Item): number {
    return item.id;
  }
}
