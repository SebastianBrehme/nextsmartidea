import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {NavBarComponent} from './nav-bar.component';

const routes:Routes = [
    { path: '',redirectTo:'/login', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class RoutingModule{}