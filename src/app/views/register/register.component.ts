import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { GuardsService } from 'src/app/services/guards/guards.service';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmPassword } from '../../utils/validators/confirm-password';
import { UsersService } from './../../services/users/users.service';

@Component({
  selector: 'track-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public isLogin: boolean;
  registerForm: FormGroup;
  constructor(
    private loginService: AuthService,
    public formbuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private guard: GuardsService,
    private authService: AuthService,
    private validators: ConfirmPassword
  ) {
    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          validators.ValidateConfirmPassword,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  register(): void {
    const { email, password, name } = this.registerForm.value;
    this.loginService
      .register(email, password)
      .then((res) => {
        if (res.user.uid) {
          const user = { email, id: res.user.uid, name };
          this.usersService
            .create(user)
            .then(() =>
              this.authService
                .login(email, password)
                .then((us: User) =>
                  this.guard
                    .storageUser(us)
                    .then(() => this.router.navigate(['/main']))
                )
            );
        }
      })
      .catch((err) => console.log(err));
  }
  changeRegister(): void {
    this.isLogin = !this.isLogin;
  }
}
