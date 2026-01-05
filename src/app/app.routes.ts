import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/user-dashboard/dashboard';
import { authGuard } from './core/guards/auth.gaurd';
import { CreateTicketComponent } from './features/ticket/create-ticket/create-ticket';
import { GetMyTicket } from './features/ticket/get-my-ticket/get-my-ticket';
import { OnSpecificTicket } from './features/ticket/on-specific-ticket/on-specific-ticket';
import { GetAllOpenTickets } from './features/ticket/get-all-open-tickets/get-all-open-tickets';
import { AssignTicket } from './features/assignment/assign-ticket/assign-ticket';
import { GetAllTickets } from './features/ticket/get-all-tickets/get-all-tickets';
import { ViewProfile } from './features/profiles/view-profile/view-profile';
import { SlaEvents } from './features/profiles/sla-events/sla-events';
import { AdminRegister } from './features/profiles/admin-register/admin-register';
import { Register } from './features/auth/register/register';
import { AgentDashboard } from './features/dashboard/agent-dashboard/agent-dashboard';
import { ManagerDashboard } from './features/dashboard/manager-dashboard/manager-dashboard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  
  { path: 'register', component: Register },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'user/dashboard', component: DashboardComponent },
  { path: 'agent/dashboard', component: AgentDashboard },
  { path: 'manager/dashboard', component: ManagerDashboard },
  { path: 'tickets/create', component: CreateTicketComponent, canActivate: [authGuard] },
  { path: 'tickets/userTicket', component: GetMyTicket, canActivate: [authGuard] },
  { path: 'viewTicket/:id', component: OnSpecificTicket, canActivate: [authGuard] },
  { path: 'allopentickets', component: GetAllOpenTickets, canActivate: [authGuard] },
  { path: 'manager/assign/:ticketId', component: AssignTicket, canActivate: [authGuard] },
  { path: 'getAllTickets', component: GetAllTickets, canActivate: [authGuard] },
    { path: 'adminViewProfiles', component: ViewProfile, canActivate: [authGuard] },
    
    { path: 'admin/sleEvents', component: SlaEvents, canActivate: [authGuard] },
        
    { path: 'admin/register', component: AdminRegister, canActivate: [authGuard] },
];
