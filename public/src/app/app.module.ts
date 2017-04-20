import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing-module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseAuthService} from './firebase/firebase-auth.service';
import { FirebaseEventService} from './firebase/firebase-event.service';
import { FirebasePollService} from './firebase/firebase-poll.service';
import { NavBarComponent} from './nav-bar.component';
import { UserService} from './user.service';
import { EventService } from './event/event.service';
import { CreateEventComponent } from './event/create-event.component';
import { ContactComponent} from './contact/contact.component';
import { DetailViewComponent } from './event/view/detail-view.component';
import { SidebarModule } from 'ng-sidebar';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';
import { UpdateEventComponent } from './event/update-event.component';

@NgModule({

  imports: [BrowserModule, FormsModule, RoutingModule, SidebarModule.forRoot()],
  declarations: [AppComponent, DashboardComponent, LoginComponent, NavBarComponent, CreateEventComponent, ContactComponent, DetailViewComponent, SidebarContentComponent, UpdateEventComponent],
  providers: [FirebaseService, FirebaseAuthService,FirebaseEventService, FirebasePollService, UserService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
