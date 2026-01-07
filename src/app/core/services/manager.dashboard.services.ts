import { Injectable } from '@angular/core';
import { TicketService } from './ticket.services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  constructor(private ticketService: TicketService) {}

  getAdminDashboard() {
    return this.ticketService.getAllTickets().pipe(
      map((tickets: any[]) => {
        return {
          total: tickets.length,
          open: tickets.filter(t => t.status === 'OPEN').length,
          inProgress: tickets.filter(t => t.status === 'INPROGRESS').length,
          resolved: tickets.filter(t => t.status === 'RESOLVED').length,
          closed: tickets.filter(t => t.status === 'CLOSED').length,
          escalated: tickets.filter(t => t.status === 'ESCALATED').length,
          breached: tickets.filter(t => t.status === 'BREACHED').length
        };
      })
    );
  }
}
