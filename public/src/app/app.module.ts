import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing-module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { FirebaseFacade } from './firebase/firebase.service';
import { FirebaseAuthService} from './firebase/firebase-auth.service';
import { FirebaseEventService} from './firebase/firebase-event.service';
import { FirebaseChatService} from './firebase/firebase-chat.service';
import { FirebaseSurveyService} from './firebase/firebase-survey.service';
import { FirebaseTaskService} from './firebase/firebase-task.service';
import { NavBarComponent} from './nav-bar.component';
import { UserService} from './user.service';
import { EventService } from './event/event.service';
import { SurveyService } from './event/survey/survey.service';
import { ChatService} from './event/chat/chat.service';
import { TaskService} from './event/task/task.service';
import { CreateEventComponent } from './event/create-event.component';
import { ContactComponent} from './contact/contact.component';
import { DetailViewComponent } from './event/view/detail-view.component';
import { SidebarModule } from 'ng-sidebar';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';
import { UpdateEventComponent } from './event/update-event.component';
import { CreateSurveyComponent } from './event/survey/create-survey.component';
import { ChatComponent } from './event/chat/chat.component'
import { SurveyComponent } from './event/survey/survey.component';
import { CreateTaskComponent } from './event/task/create-task.component';
import { TaskComponent } from './event/task/task.component';
import { ChartsModule} from 'ng2-charts';

@NgModule({

  imports: [BrowserModule, FormsModule, RoutingModule, SidebarModule.forRoot(),ChartsModule],
  declarations: [AppComponent, DashboardComponent, LoginComponent, NavBarComponent, CreateEventComponent, 
  ContactComponent, DetailViewComponent, SidebarContentComponent, UpdateEventComponent, CreateSurveyComponent,
  ChatComponent, SurveyComponent, CreateTaskComponent, TaskComponent],
  providers: [FirebaseFacade, FirebaseAuthService,FirebaseEventService, FirebaseSurveyService,FirebaseChatService, FirebaseTaskService,UserService, EventService, SurveyService, ChatService,TaskService],

  bootstrap: [AppComponent]
})
export class AppModule { }
