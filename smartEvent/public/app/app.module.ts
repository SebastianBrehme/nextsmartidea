import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing-module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { FirebaseService } from './firebase.service';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  declarations: [AppComponent, DashboardComponent, LoginComponent],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
