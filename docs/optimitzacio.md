# Optimització de l'Aplicació

## 1. Estratègia OnPush
S'ha aplicat `ChangeDetectionStrategy.OnPush` als següents components presentacionals per evitar comprovacions innecessàries al cicle de detecció de canvis:

* **ItemCardComponent**: S'ha creat aquest component de visualitzacio específicament per a mostrar cada element de la llista. En ser un component tonto que només rep dades mitjançant `@Input()` i emet clics a través de `@Output()`, és el candidat perfecte per a OnPush. Angular només avaluarà aquest component quan la referència de l'element passat per paràmetre canviï.
  
* **DetallComponent**: S'ha triat perquè és un component principalment de visualització. Com que les dades s'obtenen mitjançant una subscripció asíncrona a un servei, s'ha injectat `ChangeDetectorRef` i s'utilitza `markForCheck()` per notificar a Angular manualment quan les dades de l'API ja estan a punt per ser renderitzades.
  
* **HeaderComponent**: Tot i ser un component contenidor que injecta serveis, s'ha optimitzat amb OnPush perquè el seu estat a la vista depèn exclusivament d'un Observable (`user$`). Utilitzant el pipe `async` al HTML, Angular s'encarrega d'actualitzar el component automàticament només quan s'emet un nou valor.

## 2. Virtualització amb Angular CDK
S'ha implementat `CdkVirtualScrollViewport` al `CatalegPageComponent` per optimitzar el llistat principal que conté els 100 elements (provinents de JsonPlaceholder).

* **Nombre d'elements**: 100 elements complets.
* **Resultat**: En comptes de crear 100 nodes al DOM simultàniament, Angular només renderitza els aproximadament 4 o 5 components `<app-item-card>` que caben en els `500px` d'alçada del viewport, reciclant-los de forma eficient a mesura que l'usuari fa scroll. Això redueix dràsticament la càrrega inicial fent que duri menys de 3 segons.