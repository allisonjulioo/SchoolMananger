import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class GuardsService implements CanActivate {
  user: Observable<User>;
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  public currentUser = this.currentUser$.asObservable();

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  public async storageUser(user: User): Promise<void> {
    localStorage.setItem('user', JSON.stringify(user));
    await this.checkIfUserLogged();
  }
  public async checkIfUserLogged(): Promise<void> {
    this.user = this.getUser();
    if (!this.user) {
      this.router.navigate(['login']);
    }
  }
  public getUser(): Observable<User> {
    const user = JSON.parse(localStorage.getItem('user'));
    this.currentUser$.next(user);
    return user;
  }
  canActivate(): Observable<boolean> | boolean {
    this.checkIfUserLogged();
    return !!this.user;
  }
}
