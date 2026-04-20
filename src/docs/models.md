# Models i adaptadors

## Interfícies principals

### ElementCataleg (model intern)

Model utilitzat dins l'aplicació Angular:

```typescript
export interface ElementCataleg {
  id: string;
  titol: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatgeUrl: string;
  esPopular: boolean;
  unitats: number;
}
```

### ElementApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
export interface ElementApiResponse {
  id: string;
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}
```

## Adaptadors

### adaptarElementApi()

Transforma un element de l'API al format intern:

- Canvia `nom` → `titol`
- Canvia `popular` → `esPopular`
- Canvia `imatge` → `imatgeUrl`
- Canvia `stock` → `unitats`
- Manté la resta de camps

### adaptarElementsApi()

Aplica `adaptarElementApi()` a un array d'elements.

## Mapeig de camps

| Camp API     | Camp intern  | Transformació |
| ------------ | ------------ | ------------- |
| `id`         | `id`         | Cap           |
| `nom`        | `titol`      | Renombrat     |
| `descripcio` | `descripcio` | Cap           |
| `categoria`  | `categoria`  | Cap           |
| `preu`       | `preu`       | Cap           |
| `imatge`     | `imatgeUrl`  | Renombrat     |
| `popular`    | `esPopular`  | Renombrat     |
| `stock`      | `unitats`    | Renombrat     |
