import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { firebaseConfig } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GuardsService } from './services/guards/guards.service';
import { HttpUtilsService } from './services/http-utils/http-util-service.service';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    SideMenuComponent,
    HeaderComponent,
  ],
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
    HttpUtilsService,
    AngularFireModule,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
