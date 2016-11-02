import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {NavBarComponent} from './nav-bar.component';
import { CreateEventComponent } from './event/create-event.component'
import { ContactComponent} from './contact/contact.component'

const routes:Routes = [
    { path: '',redirectTo:'/login', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'create-event', component: CreateEventComponent},
    { path: 'contact', component: ContactComponent}
    
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class RoutingModule{}