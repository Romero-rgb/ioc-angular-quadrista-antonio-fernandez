import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { mockData } from './mocks/dades-mocks'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-quadrista-antonio-fernandez';

}
