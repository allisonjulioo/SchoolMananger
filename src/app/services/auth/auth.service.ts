import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../../models/user/user';
import { GuardsService } from '../guards/guards.service';
import { HttpUtilService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private httpUtils: HttpUtilService,
    private guard: GuardsService
  ) {}
  public async login(email: string, password: string): Promise<User> {
    this.user = (await this.angularFireAuth.signInWithEmailAndPassword(
      email,
      password
    )) as User;
    return this.user.user;
  }
  public async register(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
  public async logout(): Promise<void> {
    await localStorage.removeItem('user');
    await this.angularFireAuth.signOut();
    await this.guard.checkIfUserLogged();
  }
}
