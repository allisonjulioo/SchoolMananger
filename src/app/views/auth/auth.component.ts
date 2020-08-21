import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'track-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLogin: boolean = true;
  public showContent: boolean = true;
  constructor(private loginService: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
  login(): void {
    const { email, password } = this.loginForm.value;
    this.loginService
      .login(email, password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  changeRegister(): void {
    this.isLogin = !this.isLogin;
    setTimeout(() => (this.showContent = !this.showContent), 200);
  }
}
