import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpUtilsService } from 'src/app/services/http-utils/http-util-service.service';
import { GuardsService } from '../../services/guards/guards.service';
import { DynamicFormBuilderComponent } from '../../shared/dynamic-form-builder/dynamic-form-builder.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { ProfileComponent } from '../../views/profile/profile.component';
import { EditComponent } from '../edit/edit.component';
import { ListComponent } from '../list/list.component';
import { BuilderComponent } from './../../shared/dynamic-form-builder/shared/builder/builder.component';
import { CheckboxComponent } from './../../shared/dynamic-form-builder/shared/checkbox/checkbox.component';
import { DropdownComponent } from './../../shared/dynamic-form-builder/shared/dropdown/dropdown.component';
import { FileComponent } from './../../shared/dynamic-form-builder/shared/file/file.component';
import { RadioComponent } from './../../shared/dynamic-form-builder/shared/radio/radio.component';
import { TextBoxComponent } from './../../shared/dynamic-form-builder/shared/text-box/text-box.component';
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
    DynamicFormBuilderComponent,
    BuilderComponent,
    DropdownComponent,
    TextBoxComponent,
    FileComponent,
    RadioComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MainRoutingModule],
  providers: [
    GuardsService,
    HttpUtilsService,
    AngularFireModule,
    AngularFireAuth,
    AngularFirestore,
  ],
})
export class MainModule {}
