import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event-component.html'
})
export class AddEventComponent {

  event = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    organizer: ''
  };

  constructor(
    private eventService: EventService,
    public router: Router
  ) {}

  addEvent() {

    this.eventService.addEvent(this.event).subscribe({

      next: () => {

        alert('Event added successfully');

        this.router.navigate(['/admin']);

      },

      error: (error) => {
        alert(error.error.message);
      }

    });

  }
}
