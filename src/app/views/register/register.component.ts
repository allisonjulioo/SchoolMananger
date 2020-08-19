import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmPassword } from '../../utils/validators/confirm-password';

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
    private validators: ConfirmPassword
  ) {
    this.registerForm = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        null,
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
