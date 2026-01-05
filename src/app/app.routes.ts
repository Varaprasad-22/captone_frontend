import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.gaurd';
import { CreateTicketComponent } from './features/ticket/create-ticket/create-ticket';
import { GetMyTicket } from './features/ticket/get-my-ticket/get-my-ticket';
import { OnSpecificTicket } from './features/ticket/on-specific-ticket/on-specific-ticket';
import { GetAllOpenTickets } from './features/ticket/get-all-open-tickets/get-all-open-tickets';
import { AssignTicket } from './features/assignment/assign-ticket/assign-ticket';
import { GetAllTickets } from './features/ticket/get-all-tickets/get-all-tickets';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tickets/create', component: CreateTicketComponent, canActivate: [authGuard] },
  { path: 'tickets/userTicket', component: GetMyTicket, canActivate: [authGuard] },
  { path: 'viewTicket/:id', component: OnSpecificTicket, canActivate: [authGuard] },
  { path: 'allopentickets', component: GetAllOpenTickets, canActivate: [authGuard] },
  { path: 'manager/assign/:ticketId', component: AssignTicket, canActivate: [authGuard] },
  { path: 'getAllTickets', component: GetAllTickets, canActivate: [authGuard] }
];
