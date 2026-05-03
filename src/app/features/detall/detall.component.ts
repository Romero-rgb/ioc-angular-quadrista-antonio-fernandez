import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detall',
  standalone: true,
  imports: [],
  templateUrl: './detall.component.html',
  styleUrl: './detall.component.scss',
})
export class DetallComponent {
  elementID: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.elementID = this.route.snapshot.paramMap.get('id');
  }
}
