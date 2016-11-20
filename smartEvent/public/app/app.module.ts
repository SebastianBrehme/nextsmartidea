import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing-module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { FirebaseService } from './firebase.service';
import { NavBarComponent} from './nav-bar.component';
import { UserService} from './user.service';
import { EventService } from './event/event.service';
import { EventDataService} from './event/event-data.service';
import { CreateEventComponent } from './event/create-event.component';
import { ContactComponent} from './contact/contact.component';
import { ContainerViewComponent } from './event/view/container-view.component';
import { DetailViewComponent } from './event/view/detail-view.component';
import { SidebarModule } from 'ng2-sidebar';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule, SidebarModule],
  declarations: [AppComponent, DashboardComponent, LoginComponent, NavBarComponent, CreateEventComponent, ContactComponent, ContainerViewComponent, DetailViewComponent, SidebarContentComponent],
  providers: [FirebaseService, UserService, EventService,EventDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
