import { Component } from '@angular/core';
import { mockData } from './mocks/dades-mocks';
import { Element } from './models/element.model';
import { TargetaElementComponent } from './components/targeta-element/targeta-element.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TargetaElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ioc-angular-quadrista-antonio-fernandez';

  elementProva: Element = {
    id: 1,
    name: 'Element de prova',
    value: 1,
    category: 'Test',
  };
}
