import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

import { AuthService } from './auth.services';
import { TicketService } from './ticket.services';

@Injectable({
  providedIn: 'root'
})
export class AgentDashboardService {

  private baseUrl = `${environment.apiGateway}/assignments/agents`;

  constructor(
    private http: HttpClient,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  getAgentDashboard() {
    const agentId = this.authService.getUser().id?? undefined;

    const tickets$ = this.ticketService.getAgentTickets(agentId); // existing
    const workload$ = this.http.get<any[]>(
      `${this.baseUrl}/${agentId}/workload`
    );

    return forkJoin([tickets$, workload$]).pipe(
      map(([tickets, workload]) => ({
        totalTickets: tickets.length,
        active: workload.find(w => w.status === 'ACTIVE')?.count || 0,
        breached: workload.find(w => w.status === 'BREACHED')?.count || 0,
        escalations: workload.find(w => w.status === 'ESCALATED')?.count || 0,
        reassigned: workload.find(w => w.status === 'REASSIGNED')?.count || 0
      }))
    );
  }
}
