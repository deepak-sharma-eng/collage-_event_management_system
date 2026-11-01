import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './events-component.html'
})
export class EventsComponent implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService,private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {

    this.eventService.getEvents().subscribe({
      next: (data: any) => {
        this.events = data;
        this.cd.detectChanges();
      },

      error: (error) => {
        console.log(error);
      }
    });
  }
}