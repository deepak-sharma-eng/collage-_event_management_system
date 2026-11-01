import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event-component.html'
})
export class EditEventComponent implements OnInit {

  id = '';

  event: any = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    organizer: ''
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.eventService.getEvent(this.id).subscribe({

      next: (data) => {
        this.event = data;
      }

    });

  }

  updateEvent() {

    this.eventService
      .updateEvent(this.id, this.event)
      .subscribe({

        next: () => {

          alert('Event updated successfully');

          this.router.navigate(['/admin']);

        },

        error: (error) => {
          alert(error.error.message);
        }

      });

  }
}