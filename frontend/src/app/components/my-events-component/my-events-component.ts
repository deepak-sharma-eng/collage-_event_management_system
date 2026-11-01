import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-events-component.html'
})
export class MyEventsComponent implements OnInit {

  registrations: any[] = [];

  constructor(
    private registrationService: RegistrationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {

    this.registrationService
      .getMyEvents()
      .subscribe({
        next: (data: any) => {
          this.registrations = data;
          this.cd.detectChanges();
        },

        error: (error) => {
          console.log(error);
        }
      });
  }
}