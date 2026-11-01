import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  role: 'student' | 'admin' = 'student';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.login(data).subscribe({
      next: (response: any) => {

        this.auth.saveLogin(response);

        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/student']);
        }

      },

      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
