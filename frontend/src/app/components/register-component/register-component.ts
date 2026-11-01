import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-component.html'
})
export class RegisterComponent {

  name = '';
  studentId = '';
  department = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {

    const data = {
      name: this.name,
      studentId: this.studentId,
      department: this.department,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: () => {

        alert('Registration successful');

        this.router.navigate(['/login']);

      },

      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
