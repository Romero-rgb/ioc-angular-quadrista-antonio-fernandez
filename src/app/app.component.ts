import { Component } from '@angular/core';
import { mockData } from './mocks/dades-mocks';
import { Element } from './models/element.model';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LlistaElementsComponent, BarraCercaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ioc-angular-quadrista-antonio-fernandez';

  fullElements: Element[] = mockData;
  filterElements: Element[] = this.fullElements;
  actualSearch = '';

  filterTheElements(textSearch: string): void {
    this.actualSearch = textSearch;

    if (!textSearch) {
      this.filterElements = this.fullElements;
      return;
    }

    const searchMin = textSearch.toLowerCase();
    this.filterElements = this.fullElements.filter(
      (element) =>
        element.name.toLowerCase().includes(searchMin) ||
        element.category?.toLowerCase().includes(searchMin),
    );
  }
}
