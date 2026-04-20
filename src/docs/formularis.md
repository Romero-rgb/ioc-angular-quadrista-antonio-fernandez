# Formularis

## Formularis Reactius

Els formularis d'aquest projecte utilitzen el mòdul de `ReactiveFormsModule`. Aquests components separen completament la lògica del template, permetent validacions complexes mitjançant regles síncrones i asíncrones, així com col·leccions dinàmiques com `FormArray`.

## FormulariCercaComponent

### Funcionalitat

Formulari reactiu per cercar elements del catàleg amb validació de longitud mínima i cerca automàtica amb debounce.

### Validacions (Síncrones)

| Camp | Validador | Missatge d'error |
|------|-----------|------------------|
| `terme` | `Validators.minLength(2)` | "Mínim 2 caràcters" |
| `terme` | `Validators.maxLength(50)` | "Màxim 50 caràcters" |

### Comportament

- **Cerca automàtica:** Mitjançant la funció `valueChanges` s'observen els canvis de text.
- **Debounce:** Utilitzant l'operador RxJS `debounceTime(500)` per evitar crides excessives.
- **Indicador de càrrega:** Un getter enllaçat al servei visualitza o oculta l'spinner.
- **Botó netejar:** Es una creu que apareix quan hi ha text, neteja i torna als populars.

### Exemple d'integració

```typescript
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';

@Component({
  selector: 'app-cataleg-page',
  standalone: true,
  imports: [CommonModule, FormulariCercaComponent],
  templateUrl: './cataleg-page.component.html',
  styleUrl: './cataleg-page.component.scss',
})
export class CatalegPageComponent implements OnInit {}
```

## PreferitsPanelComponent (FormArray)

Ús avançat de `FormArray` per afegir notes als elements preferits.

### Ús de FormArray per notes
1. Es defineix l'array a la inicialització: `this.formulariNotes = this.fb.group({ notes: this.fb.array([]) });`
2. Quan se selecciona un preferit s'esborren els controls i es crea un control de text en un bucle depenent de quantes notes existeixen assignades, a més d'afegir-ne un buit per posar-hi text nou.
3. Tots els `FormControl` de l'array es registren amb validadors síncrons: `Validators.required` i `Validators.minLength(3)`.

## Validadors Asíncrons (`codi-disponible.validator.ts`)

L'aplicació compta amb regles de comprovació asíncrones per a garantir codis únics simulant una càrrega.

### Funcionalitat
S'esperen `500ms` de debounce per evitar sobrecarregar abans d'invocar `ElementService.codiDisponible(codi)`, el qual simula la consulta del codi retornant null si pot ser guardat o l'objecte original amb l'error per bloquejar el guardat.
