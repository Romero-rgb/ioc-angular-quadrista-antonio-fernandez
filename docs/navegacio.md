# Navegació

## Mapa de Rutes

A continuació es detalla el mapa de rutes configurat a l'aplicació segons l'arxiu `app.routes.ts`:

| Path             | Component              | Accés    | Descripció                                                                 |
| :--------------- | :--------------------- | :------- | :------------------------------------------------------------------------- |
| `/` (ruta buida) | _Redirecció_           | Públic   | Redirigeix automàticament a `/cataleg` (`pathMatch: 'full'`).              |
| `/cataleg`       | `CatalegPageComponent` | Públic   | Pàgina principal amb el llistat d'elements del catàleg.                    |
| `/cerca`         | `CercaComponent`       | Públic   | Vista dedicada a la cerca d'elements.                                      |
| `/detall/:id`    | `DetallComponent`      | Públic   | Vista de detall d'un element específic, rebent el paràmetre dinàmic `:id`. Només es pot entrar desde la targeta dún element |
| `/preferits`     | `PreferitsComponent`   | Privat\* | Secció de preferits de l'usuari                                            |
| `/login`         | `LoginComponent`       | Públic   | Formulari d'inici de sessió de l'aplicació.                                |
| `**` (wildcard)  | _Redirecció_           | Públic   | Captura qualsevol URL no reconeguda i redirigeix a `/cataleg`.             |

## Configuració

L'enrutament de l'aplicació s'ha configurat correctament aplicant les directrius d'Angular per a estructures amb components _Standalone_:

- **`provideRouter`**: Al fitxer `src/app/app.config.ts`, s'ha importat la constant `routes` (definida a `app.routes.ts`) i s'ha donat a l'aplicació principal mitjançant la funció `provideRouter(routes)` dins de l'array de `providers`.
- **`RouterOutlet`**: Al fitxer `src/app/app.component.html`, s'ha col·locat l'etiqueta `<router-outlet></router-outlet>` dins del contenidor `<main>`. Aquest element actua com a marcador de posició; és aquí on Angular renderitza dinàmicament el component que s'associa a la URL activa. S'ha importat el `RouterModule` a l'`app.component.ts`.
- **`RouterLink`**: Al menú de navegació del `HeaderComponent`, s'ha col·locat la directiva `routerLink="/ruta"`. Això permet que la web sigui una SPA (Single Page Application), permetent transicions instantànies entre vistes sense que el navegador hagi de recarregar completament la pàgina. També s'ha usat la directiva `routerLinkActive="active"` per afegir visualment una classe quan la ruta coincideix amb l'enllaç clicat.
