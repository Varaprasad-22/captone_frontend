import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-my-ticket',
  imports: [CommonModule],
  templateUrl: './get-my-ticket.html',
  styleUrl: './get-my-ticket.css',
})
export class GetMyTicket {

  tickets:any;
  loading;
  errorMessage;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
 
    this.tickets = [];
    this.loading = true;
    this.errorMessage = '';

    this.ticketService.getUserTickets().subscribe({
      next: (res) => {
        this.tickets = res; //  List<TicketResponse>
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load tickets';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openTicket(ticketId: string) {
    this.router.navigate(['/viewTicket',ticketId]);
  }
}
