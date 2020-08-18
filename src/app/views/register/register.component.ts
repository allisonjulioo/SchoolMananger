import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'track-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public isLogin: boolean;
  constructor(private loginService: AuthService) {}
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
  register(): void {
    const { email, password } = this.registerForm.value;
    this.loginService
      .register(email, password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  changeRegister(): void {
    this.isLogin = !this.isLogin;
  }
}
