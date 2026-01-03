import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.gaurd';
import { CreateTicketComponent } from './features/ticket/create-ticket/create-ticket';
import { GetMyTicket } from './features/ticket/get-my-ticket/get-my-ticket';
import { OnSpecificTicket } from './features/ticket/on-specific-ticket/on-specific-ticket';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'tickets/create', component: CreateTicketComponent, canActivate: [authGuard] },
    {path:'tickets/userTicket',component:GetMyTicket,canActivate:[authGuard]},
      { path: 'viewTicket/:id', component: OnSpecificTicket, canActivate:[authGuard]},
      
];
