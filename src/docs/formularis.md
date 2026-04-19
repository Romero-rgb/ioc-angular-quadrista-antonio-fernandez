# Formularis

## FormulariCercaComponent

### Funcionalitat

Formulari reactiu per cercar elements del catàleg amb validació de longitud mínima i cerca automàtica amb debounce.

### Validacions

| Camp | Validació | Missatge d'error |
|------|-----------|------------------|
| terme | `minLength(2)` | "Mínim 3 caràcters" |
| terme | `maxLenth(50)` | "Màxim 50 caràcters" |

### Comportament

- **Cerca automàtica:** Després de 500ms sense escriure, cerca automàticament
- **Debounce:** Evita cerques excessives mentre l'usuari escriu
- **Indicador de càrrega:** Spinner petit mentre cerca
- **Botó netejar:** Es una creu que apareix quan hi ha text, neteja i torna als populars

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