import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardsService } from './services/guards/guards.service';
import { HttpUtilService } from './services/http-utils/http-util-service.service';
import { AuthComponent } from './views/auth/auth.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCOWahJCZDxPZxlAGMAizZMqA0aeBa-I_c',
  authDomain: 'trackto-challenge.firebaseapp.com',
  databaseURL: 'https://trackto-challenge.firebaseio.com',
  projectId: 'trackto-challenge',
  storageBucket: 'trackto-challenge.appspot.com',
  messagingSenderId: '674937246723',
  appId: '1:674937246723:web:a5f7288cf7a358eb6e6a36',
  measurementId: 'G-4RJ3WHX2BG',
};
@NgModule({
  declarations: [AppComponent, AuthComponent, RegisterComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    GuardsService,
    HttpUtilService,
    AngularFireModule,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
