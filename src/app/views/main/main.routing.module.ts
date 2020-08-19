import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsService } from '../../services/guards/guards.service';
import { EditComponent } from '../../views/edit/edit.component';
import { ListComponent } from '../../views/list/list.component';
import { ProfileComponent } from '../../views/profile/profile.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Home' },
    canActivate: [GuardsService],
    children: [
      {
        path: 'profile',
        pathMatch: 'full',
        data: { title: 'Perfil' },
        component: ProfileComponent,
      },
      {
        path: 'list/:type',
        pathMatch: 'full',
        data: { title: 'Listagem' },
        component: ListComponent,
      },
      {
        path: 'edit/:id/:type',
        pathMatch: 'full',
        data: { title: 'Editar' },
        component: EditComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
