import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MockRegisterService } from '../../services/mock-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isSubmitting: boolean;
  public isFaded: boolean;

  register: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, this.passwordPatternValidator()])
    ),
    confirmPassword: new FormControl('', Validators.required),
    terms: new FormControl(false, Validators.requiredTrue),
  });

  get formControl() {
    return this.register.controls;
  }

  get email() {
    return this.register.get('email');
  }

  get password() {
    return this.register.get('password');
  }

  get confirmPassword() {
    return this.register.get('confirmPassword');
  }

  get terms() {
    return this.register.get('terms');
  }

  constructor(
    private mockRegisterService: MockRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  passwordPatternValidator(): ValidatorFn {
    return (passwordControl: AbstractControl): ValidationErrors | null => {
      if (!passwordControl.value) {
        return { emptyPassword: true };
      }
      const leterAndDigit = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
      const duplicates = /(\w)\1+/;
      const valid =
        leterAndDigit.test(passwordControl.value) &&
        !duplicates.test(passwordControl.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  onSubmit(): void {
    if (this.register.valid) {
      this.isSubmitting = true;

      let user = {
        email: this.email?.value,
        password: this.password?.value,
        terms: this.terms?.value,
      };

      const redirect = () => {
        this.isFaded = false;
        this.router.navigate(['/']);
      };

      const fade = () => {
        this.isSubmitting = false;
        this.isFaded = true;
        setTimeout(redirect, 2000);
      };

      this.mockRegisterService.registerUser(user).subscribe((user) => {
        localStorage.setItem('token', JSON.stringify(user));
        setTimeout(fade, 2000);
      });
    } else {
      Object.keys(this.register.controls).forEach((field) => {
        const control = this.register.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
