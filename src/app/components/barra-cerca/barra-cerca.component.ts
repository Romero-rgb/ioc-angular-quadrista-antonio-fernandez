import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barra-cerca.component.html',
  styleUrl: './barra-cerca.component.scss',
})
export class BarraCercaComponent {
  @Output() searchChange = new EventEmitter<string>();

  textSearch = '';

  search(): void {
    if (this.textSearch.length >= 3) {
      this.searchChange.emit(this.textSearch);
    }
  }

  netejar(): void {
    this.textSearch = '';
    this.searchChange.emit('');
  }
}
