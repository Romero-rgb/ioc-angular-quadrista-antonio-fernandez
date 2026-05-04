import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Item } from '../../../core/models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.item.id);
  }
}
