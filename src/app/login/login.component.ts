import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupData: { email: string, password: string, confirmPassword: string } = { email: '', password: '', confirmPassword: '' }
  authService: AuthService = inject(AuthService);
  private toastr = inject(ToastrService);

  onLogin(ngForm: NgForm) {
    const emailFormControl = ngForm.form.controls['loginEmail'];
    const passwordFormControl = ngForm.form.controls['loginPassword'];
    if (!ngForm.valid) {
      if (!emailFormControl.valid) {
        this.toastr.error("Email field has errors.");
      }
      else if (!passwordFormControl.value) {
        this.toastr.error("Password field has errors.");
      }
    }
    else {
      const emailID: string = emailFormControl.value;
      const password: string = passwordFormControl.value;
      if (emailID && password) {
        this.authService.login(emailID, password)
      }
    }
  }

  onSignup() {
    if (this.signupData.email.length > 0 && this.signupData.password.length > 0) {
      console.log("Performing signup!!")
      this.authService.signup(this.signupData)
    }
  }

  validateForm() {

  }
}
