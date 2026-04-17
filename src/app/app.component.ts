import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementService } from './serveis/element.service';
import { CatalegPageComponent } from './pages/cataleg-page/cataleg-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalegPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {}
