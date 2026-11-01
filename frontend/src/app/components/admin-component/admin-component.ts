import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-component.html'
})
export class AdminComponent implements OnInit {

  events: any[] = [];
  registrations: any[] = [];

  constructor(
    private eventService: EventService,
    private registrationService: RegistrationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.loadRegistrations();
  }

  loadEvents() {

    this.eventService.getEvents().subscribe({
      next: (data: any) => {
        this.events = data;
        this.cd.detectChanges();
      }
    });

  }

  loadRegistrations() {

    this.registrationService
      .getAllRegistrations()
      .subscribe({
        next: (data: any) => {
          this.registrations = data;
          this.cd.detectChanges();
        }
      });

  }

  deleteEvent(id: string) {

    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    this.eventService.deleteEvent(id).subscribe({

      next: () => {

        alert('Event deleted');

        this.loadEvents();

      },

      error: (error) => {
        alert(error.error.message);
      }

    });
  }
}