import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { EventsComponent } from './components/events-component/events-component';
import { EventDetailsComponent } from './components/event-details-component/event-details-component';
import { MyEventsComponent } from './components/my-events-component/my-events-component';
import { AdminComponent } from './components/admin-component/admin-component';
import { AddEventComponent } from './components/add-event-component/add-event-component';
import { EditEventComponent } from './components/edit-event-component/edit-event-component';
import { StudentDashboardComponent } from './components/student-dashboard-component/student-dashboard-component';
import { adminGuard, studentGuard } from './guards/auth.guard';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'events',
    component: EventsComponent
  },

  {
    path: 'events/:id',
    component: EventDetailsComponent
  },

  {
    path: 'my-events',
    component: MyEventsComponent,
    canActivate: [studentGuard]
  },

  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [studentGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'admin/add-event',
    component: AddEventComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'admin/edit-event/:id',
    component: EditEventComponent,
    canActivate: [adminGuard]
  },

  {
    path: '**',
    redirectTo: 'events'
  }

];
