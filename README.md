# Quadrista

## Un catàleg únic per els bojos de les bicicletes!

## Descripció:

Quadrista és una aplicació de gestió i control de components de bicicletes.

Permet a l’usuari:

- Crear un catàleg personalitzat de peces.
- Permet posar peces en preferits

## Mapa de rutes

| Path             | Component              | Accés    | Descripció                                                                                                                  |
| :--------------- | :--------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `/` (ruta buida) | _Redirecció_           | Públic   | Redirigeix automàticament a `/cataleg` (`pathMatch: 'full'`).                                                               |
| `/cataleg`       | `CatalegPageComponent` | Públic   | Pàgina principal amb el llistat d'elements del catàleg.                                                                     |
| `/cerca`         | `CercaComponent`       | Públic   | Vista dedicada a la cerca d'elements.                                                                                       |
| `/detall/:id`    | `DetallComponent`      | Públic   | Vista de detall d'un element específic, rebent el paràmetre dinàmic `:id`. Només es pot entrar desde la targeta dún element |
| `/preferits`     | `PreferitsComponent`   | Privat\* | Secció de preferits de l'usuari                                                                                             |
| `/login`         | `LoginComponent`       | Públic   | Formulari d'inici de sessió de l'aplicació.                                                                                 |
| `**` (wildcard)  | _Redirecció_           | Públic   | Captura qualsevol URL no reconeguda i redirigeix a `/cataleg`.                                                              |

## Instruccions per executar l'aplicació

```bash
   git clone -b ra4-navegacio [https://github.com/Romero-rgb/ioc-angular-quadrista-antonio-fernandez.git]
```

```bash
cd ioc-angular-quadrista-antonio-fernandez/tree/ra4-navegacio
```

```bash
npm install
ng serve
```

- Obrir navegador a http://localhost:4200

## Build de producció

| Initial chunk files   | Names     | Raw size      | Estimated transfer size |
| :-------------------- | :-------- | :------------ | :---------------------- |
| chunk-ZK3453WV.js     | -         | 263.52 kB     | 69.85 kB                |
| main-V3B4777G.js      | main      | 74.58 kB      | 16.98 kB                |
| polyfills-FFHMD2TL.js | polyfills | 34.52 kB      | 11.28 kB                |
| styles-5INURTSO.css   | styles    | 0 bytes       | 0 bytes                 |
| **Initial total**     |           | **372.61 kB** | **98.11 kB**            |

| Lazy chunk files  | Names               | Raw size | Estimated transfer size |
| :---------------- | :------------------ | :------- | :---------------------- |
| chunk-5DTEHFOQ.js | preferits-component | 5.15 kB  | 1.38 kB                 |

## Credencial de prova

**Admin:**

- Email: `admin@test.com`
- Password: `1234`

**Usuari:**

- Email: `user@test.com`
- Password: `1234`
-

## Comentari personal

Moltíssimes gràcies per la dedicació al mòdul. M'ha agradat molt la temàtica i la idea d'un projecte personal segons els nostres interessos. Malauradament, a l'inici anava amb moltes ganes, però la realitat m'ha enfonsat una miqueta. He hagut d'anar principalment per feina, ja que tinc un treball a jornada completa molt exigent, així que aquesta entrega serà (així com les altres) un _placeholder_.

Moltes gràcies! I ho sento si no està més personalitzat visualment. Aquest estiu prometo que ho personalitzaré i ho acabaré com cal, crec que aquest projecte es mereix molt més.
