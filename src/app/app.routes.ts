import { Routes } from '@angular/router'
import { CatalegPageComponent } from './features/cataleg-page/cataleg-page.component';
import { CercaComponent } from './features/cerca/cerca.component';
import { DetallComponent } from './features/detall/detall.component';
import { PreferitsComponent } from './features/preferits/preferits.component';
import { LoginComponent } from './features/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: 'cataleg', pathMatch: 'full'},
    { path: 'cataleg', component: CatalegPageComponent, title: 'Cataleg'},
    { path: 'cerca', component: CercaComponent, title: 'Cerca'},
    { path: 'detall', component: DetallComponent, title: 'Detall'},
    { path: 'preferits', component: PreferitsComponent, title: 'Preferits'},
    { path: 'login', component: LoginComponent, title: 'Login'},
    {path: '**', redirectTo: 'cataleg'},
];