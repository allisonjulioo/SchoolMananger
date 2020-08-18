import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { HttpUtilService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private httpUtils: HttpUtilService
  ) {}
  public async login(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  public async register(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
  public async logout(): Promise<void> {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
