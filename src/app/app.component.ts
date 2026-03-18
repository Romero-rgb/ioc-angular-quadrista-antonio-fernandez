import { Component } from '@angular/core';
import { mockData } from './mocks/dades-mocks';
import { Element } from './models/element.model';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LlistaElementsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ioc-angular-quadrista-antonio-fernandez';

  elements: Element[] = mockData;
}
