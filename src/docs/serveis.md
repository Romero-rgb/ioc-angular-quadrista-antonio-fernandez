# Serveis

## ElementService

### Responsabilitats

- Comunicació HTTP amb l'API de catàleg
- Gestió d'estats de càrrega i error (signals utils)
- Transformació de respostes amb adaptadors
- Gestió centralitzada d'errors

### API Endpoints actius

- `GET /elements?popular=true`: Obté els elements amb el flag de popular activat.
- `GET /elements?q={terme}`: Cerca elements que contenen el terme en les seves dades.
- `GET /elements?id={codi}`: Cerca un element específic pel seu ID, utilitzat per la validació del codi.

### Mètodes públics

#### obtenirPopulars(): void

Carrega elements populars del catàleg.

**Flux:**

1. Canvia estat de càrrega a `true`
2. Fa petició GET a `/elements?popular=true`
3. Adapta resposta amb `adaptarElementsApi`
4. Actualitza el signal `elements` amb dades i `carregant` a `false`
5. En cas d'error, actualitza el signal `error`.

#### cercar(terme: string): void

Cerca elements per terme de cerca.

**Paràmetres:**

- `terme`: Text a cercar.

**Comportament:**

- Si terme buit: crida a `obtenirPopulars()`
- Si terme vàlid: cerca amb `/elements?q={terme}`

#### codiDisponible(codi: string): Promise<boolean>

Comprova si un codi d'element està disponible (no existeix) utilitzant lògica de timeout/delay de 500ms simulnat càrrega de xarxa.

**Ús:** Validador asíncron per formularis

**Retorna:** `true` si el codi està disponible (no és trobat), `false` si ja existeix o hi ha error.

### Signals exposats (només lectura)

- `elements()`: Array d'elements (`ElementCataleg[]`).
- `carregant()`: Booleà indicant si la petició està en curs.
- `error()`: Missatge d'error (`string | null`).

### Gestió d'errors

Errors HTTP es transformen en missatges comprensibles i es configuren en formularis reactius si cal.

| Origen          | Missatge                                  |
| --------------- | ----------------------------------------- |
| `ErrorEvent`    | "Error de xarxa: {missatge}"              |
| HTTP (servidor) | "Error del servidor ({codi}): {missatge}" |

### Exemple d'ús

```typescript
private readonly elementService = inject(ElementService);

ngOnInit() {
  this.elementService.obtenirPopulars();

  effect(() => {
    console.log('Carregant:', this.elementService.carregant());
    console.log('Elements:', this.elementService.elements());
  });
}
```

## PreferitsService

### Responsabilitats

- Emmagatzematge i recuperació persistents dels elements preferits amb 'localStorage' (`preferits-cataleg`).
- Gestió d'estats reactiva amb signals pels elements preferits i notes associades.

### Signals exposats (només lectura)

- `preferits()`: Array (`Preferit[]`) dels preferits guardats.
- `totalPreferits()`: Computed signal (`number`) del nombre de preferits.

### Mètodes públics

- `afegirPreferit(element: ElementCataleg): void`: Afegeix un element a la llista d'elements preferits i inicialitza l'array de notes associat.
- `eliminarPreferit(id: string): void`: Esborra un element dels preferits mitjançant l'ID.
- `afegirNota(id: string, nota: string): void`: Afegeix una nota (string) a un element específic.
- `eliminarNota(id: string, indexNota: number): void`: Elimina una nota específica d'un element donat pel seu índex.
- `esPreferit(id: string): boolean`: Retorna si l'element consta actualment entre els favorits.
- `obtenirPreferit(id: string): Preferit | undefined`: Retorna el model Preferit mitjançant l'ID.
