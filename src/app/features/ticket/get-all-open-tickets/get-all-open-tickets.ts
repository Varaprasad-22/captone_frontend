import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.services';
import { Router } from '@angular/router';
import { TicketResponse } from '../../../models/ticket-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-open-tickets',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './get-all-open-tickets.html',
  styleUrl: './get-all-open-tickets.css',
})
export class GetAllOpenTickets {

  tickets: TicketResponse[] = [];
  loading = true;
  errorMessage = '';

  role = localStorage.getItem('role');
  isManagerOrAdmin = false;

  selectedTicketId: string | null = null;
  agentId = '';

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isManagerOrAdmin =
      this.role === 'ROLE_MANAGER' ||
      this.role === 'ROLE_ADMIN';

    this.loadOpenTickets();
  }

  loadOpenTickets(){
    this.loading = true;

    this.ticketService.getAllOpenTickets().subscribe({
      next: (res: TicketResponse[]) => {
                console.log('OPEN TICKETS RESPONSE:', res);
        this.tickets = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load open tickets';
        this.loading = false;
      }
    });
  }

  viewTicket(ticketId: string): void {
    this.router.navigate(['/viewTicket', ticketId]);
  }

}
