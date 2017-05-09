import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {NavBarComponent} from './nav-bar.component';
import { CreateEventComponent } from './event/create-event.component';
import { ContactComponent} from './contact/contact.component';
import { DetailViewComponent } from './event/view/detail-view.component';
import { UpdateEventComponent } from './event/update-event.component';
import { CreateSurveyComponent } from './event/survey/create-survey.component';
import { CreateTaskComponent } from './event/task/create-task.component';

const routes:Routes = [
    { path: '', component: LoginComponent},
    { path: 'create-event', component: CreateEventComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'detail/:id', component: DetailViewComponent},
    { path: 'update-event/:id', component: UpdateEventComponent},
    { path: 'create-survey/:id', component: CreateSurveyComponent},
    { path: 'create-task/:id', component: CreateTaskComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class RoutingModule{}