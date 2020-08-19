import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
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
  { path: '*', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
