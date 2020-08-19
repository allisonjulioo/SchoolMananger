import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpUtilsService } from 'src/app/services/http-utils/http-util-service.service';
import { GuardsService } from '../../services/guards/guards.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { ProfileComponent } from '../../views/profile/profile.component';
import { EditComponent } from '../edit/edit.component';
import { ListComponent } from '../list/list.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    EditComponent,
    ProfileComponent,
    SideMenuComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MainRoutingModule],
  providers: [
    GuardsService,
    HttpUtilsService,
    AngularFireModule,
    AngularFireAuth,
  ],
})
export class MainModule {}
