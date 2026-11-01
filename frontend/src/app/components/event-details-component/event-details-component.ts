import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-details-component.html'
})
export class EventDetailsComponent implements OnInit {

  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private registrationService: RegistrationService,
    private cd: ChangeDetectorRef,
    public auth: AuthService
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.getEvent(id).subscribe({
        next: (data) => {
          this.event = data;
          this.cd.detectChanges();
        }
      });
    }
  }

  register() {

    this.registrationService
      .registerForEvent(this.event._id)
      .subscribe({

        next: () => {
          alert('Registered successfully!');
        },

        error: (error) => {
          alert(error.error.message);
        }

      });
  }
}