import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { TicketService } from './ticket.services';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private authBaseUrl = `${environment.apiGateway}/auth`;
  private ticketBaseUrl = `${environment.apiGateway}/tickets`;

  constructor(
    private http: HttpClient,
    private ticketService: TicketService
  ) {}

  getDashboard() {

    // get ALL users (page 0 is enough for totalElements)
    const users$ = this.http.get<any>(
      `${this.authBaseUrl}/getAll?page=0&size=1000`
    );

    const tickets$ = this.ticketService.getAllTickets();

    return forkJoin([users$, tickets$]).pipe(
      map(([usersPage, tickets]) => {

        const users = usersPage.content || [];

        return {

          totalUsers: usersPage.totalElements,
          agents: users.filter((u:any) => u.role?.name === 'ROLE_AGENT').length,
          managers: users.filter((u:any) => u.role?.name === 'ROLE_MANAGER').length,

          totalTickets: tickets.length,
          open: tickets.filter(t => t.status === 'OPEN').length,
          inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
          resolved: tickets.filter(t => t.status === 'RESOLVED').length,
          closed: tickets.filter(t => t.status === 'CLOSED').length,
          escalated: tickets.filter(t => t.status === 'ESCALATED').length,
          breached: tickets.filter(t => t.status === 'BREACHED').length
        };
      })
    );
  }
}
