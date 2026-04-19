import { CommonModule } from '@angular/common';
import { debounceTime, filter } from 'rxjs/operators';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementService } from '../../serveis/element.service';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss',
})
export class FormulariCercaComponent implements OnInit {
  formulariCerca!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly elementService = inject(ElementService);

  ngOnInit(): void {
    this.formulariCerca = this.fb.group({
      terme: ['', [Validators.minLength(2), Validators.maxLength(50)]],
    });

    this.formulariCerca
      .get('terme')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((terme) => {
        if (this.formulariCerca.get('terme')?.valid) {
          this.cercar();
        }
      });
  }

  cercar(): void {
    const terme = this.formulariCerca.get('terme')?.value;
    this.elementService.cercar(terme);
  }

  netejar(): void {
    this.formulariCerca.reset();
    this.elementService.obtenirPopulars();
  }

  get estaCarregant(): boolean {
    return this.elementService.carregant();
  }

  get termeInvalid(): boolean {
    const control = this.formulariCerca.get('terme');
    return !!(control?.invalid && control?.touched);
  }

  get missatgeError(): string {
    const control = this.formulariCerca.get('terme');
    if (control?.hasError('minlength')) {
      return 'Mínim 2 caràcters';
    }
    return '';
  }
}
