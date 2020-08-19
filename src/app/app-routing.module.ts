import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsService } from './services/guards/guards.service';
import { AuthComponent } from './views/auth/auth.component';
import { MainComponent } from './views/main/main.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
    data: { title: 'Autenticação' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    data: { title: 'Registrar' },
  },
  {
    path: 'main',
    component: MainComponent,
    pathMatch: 'full',
    data: { title: 'Home' },
    canActivate: [GuardsService],
  },
  { path: '*', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
