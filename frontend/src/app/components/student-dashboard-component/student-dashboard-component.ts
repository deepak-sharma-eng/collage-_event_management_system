import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, AuthUser } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-dashboard-component.html'
})
export class StudentDashboardComponent implements OnInit {
  user: AuthUser | null = null;
  registrationCount = 0;

  constructor(
    private auth: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.registrationService.getMyEvents().subscribe({
      next: (registrations: unknown) => {
        this.registrationCount = Array.isArray(registrations) ? registrations.length : 0;
      }
    });
  }
}
