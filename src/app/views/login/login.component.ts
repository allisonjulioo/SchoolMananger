import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuardsService } from 'src/app/services/guards/guards.service';
import { User } from '../../models/user/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'track-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private user: User;
  constructor(
    private loginService: AuthService,
    private router: Router,
    private guard: GuardsService
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  login(): void {
    const { email, password } = this.loginForm.value;
    this.loginService
      .login(email, password)
      .then(async (res) => {
        this.guard.storageUser(res).then(() => this.router.navigate(['/main']));
      })
      .catch((err) => console.log(err));
  }
}
