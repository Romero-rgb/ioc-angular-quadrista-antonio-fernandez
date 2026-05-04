import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';
import { CommonModule } from '@angular/common';
import { PreferitsService } from '../../core/services/Preferits.services';

@Component({
  selector: 'app-detall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detall.component.html',
  styleUrl: './detall.component.scss',
})
export class DetallComponent implements OnInit {
  item: Item | null = null;
  loading = true;
  error = '';
  itemId: number = 0;

  private itemService = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private preferitsService = inject(PreferitsService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.loadItem(this.itemId);
    });
  }

  loadItem(id: number): void {
    this.loading = true;
    this.itemService.getItemById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Element no trobat';
        this.loading = false;
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/cataleg']);
  }

  goToNext(): void {
    const nextId = this.itemId + 1;
    this.router.navigate(['/detall', nextId]);
  }

  goToPrevious(): void {
    if (this.itemId > 1) {
      const prevId = this.itemId - 1;
      this.router.navigate(['/detall', prevId]);
    }
  }

  addToPreferits(): void {
    if (this.item) {
      this.preferitsService.addPreferit(this.item);
    }
  }

  checkIfPreferit(): boolean {
    if (!this.item) return false;
    const llista = this.preferitsService.getPreferits();
    return llista.some((p) => p.id === this.item!.id);
  }
}
