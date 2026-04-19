import { Component, inject, OnInit } from '@angular/core';
import { PreferitsService, Preferit } from '../../serveis/preferits.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferits-panel.component.html',
  styleUrl: './preferits-panel.component.scss',
})
export class PreferitsPanelComponent implements OnInit {
  formulariNotes!: FormGroup;
  preferitSeleccionat: Preferit | null = null;

  private readonly fb = inject(FormBuilder);
  readonly preferitsService = inject(PreferitsService);


  ngOnInit(): void {
    this.formulariNotes = this.fb.group({
      notes: this.fb.array([]),
    });
  }

  get notes(): FormArray {
    return this.formulariNotes.get('notes') as FormArray;
  }

  seleccionarPreferit(preferit: Preferit): void {
    this.preferitSeleccionat = preferit;
    this.notes.clear();

    preferit.notes.forEach((nota) => {
      this.notes.push(
        this.fb.control(nota, [Validators.required, Validators.minLength(3)]),
      );
    });

    this.notes.push(
      this.fb.control('', [Validators.required, Validators.minLength(3)]),
    );
  }

  afegirNota(): void {
    if (!this.preferitSeleccionat) return;

    const ultimIndex = this.notes.length - 1;
    const ultimControl = this.notes.at(ultimIndex);

    if (ultimControl.valid) {
      const nota = ultimControl.value;
      this.preferitsService.afegirNota(
        this.preferitSeleccionat.element.id,
        nota,
      );

      const preferitActualitzat = this.preferitsService.obtenirPreferit(
        this.preferitSeleccionat.element.id,
      );
      if (preferitActualitzat) {
        this.seleccionarPreferit(preferitActualitzat);
      }
    }
  }

  eliminarNota(index: number): void {
    if (!this.preferitSeleccionat) return;

    this.preferitsService.eliminarNota(
      this.preferitSeleccionat.element.id,
      index,
    );

    const preferitActualitzat = this.preferitsService.obtenirPreferit(
      this.preferitSeleccionat.element.id,
    );
    if (preferitActualitzat) {
      this.seleccionarPreferit(preferitActualitzat);
    } else {
      this.preferitSeleccionat = null;
      this.notes.clear();
    }
  }

  eliminarPreferit(id: string): void {
    this.preferitsService.eliminarPreferit(id);
    if (this.preferitSeleccionat?.element.id === id) {
      this.preferitSeleccionat = null;
      this.notes.clear();
    }
  }

  tancarPanel(): void {
    this.preferitSeleccionat = null;
    this.notes.clear();
  }
}
