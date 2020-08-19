import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class GuardsService implements CanActivate {
  user: User;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  public async storageUser(user: User): Promise<void> {
    localStorage.setItem('user', JSON.stringify(user));
    await this.checkIfUserLogged();
  }
  public async checkIfUserLogged(): Promise<void> {
    this.user = this.getUser();
    if (!!this.user) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  canActivate(): Observable<boolean> | boolean {
    return !!this.user;
  }
}
