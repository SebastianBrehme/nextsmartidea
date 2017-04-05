import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {NavBarComponent} from './nav-bar.component';
import { CreateEventComponent } from './event/create-event.component';
import { ContactComponent} from './contact/contact.component';
import { DetailViewComponent } from './event/view/detail-view.component';
import { UpdateEventComponent } from './event/update-event.component';

const routes:Routes = [
    { path: '',redirectTo:'/login', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'create-event', component: CreateEventComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'detail/:id', component: DetailViewComponent},
    { path: 'update-event/:id', component: UpdateEventComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class RoutingModule{}