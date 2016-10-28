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

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  declarations: [AppComponent, DashboardComponent, LoginComponent, NavBarComponent],
  providers: [FirebaseService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
