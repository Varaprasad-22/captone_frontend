import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.services';
import { Router } from '@angular/router';
import { TicketResponse } from '../../../models/ticket-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-all-tickets',
  imports: [CommonModule,FormsModule],
  templateUrl: './get-all-tickets.html',
  styleUrl: './get-all-tickets.css',
})
export class GetAllTickets {
tickets: TicketResponse[] = [];
filteredTickets: TicketResponse[] = [];
  loading = true;
  errorMessage = '';

  role = localStorage.getItem('role');
  isManagerOrAdmin = false;

  selectedTicketId: string | null = null;
  agentId = '';
searchText: string = '';
  statusFilter: string = 'ALL';
  priorityFilter: string = 'ALL';
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

    this.ticketService.getAllTickets().subscribe({
      next: (res: TicketResponse[]) => {
                console.log('All TICKETS RESPONSE:', res);
        this.tickets = res;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.errorMessage = 'Failed to load open tickets';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    this.filteredTickets = this.tickets.filter(ticket => {
      
      const matchesSearch = 
        this.searchText === '' || 
        ticket.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        ticket.ticketId.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = 
        this.statusFilter === 'ALL' || 
        ticket.status === this.statusFilter;

      const matchesPriority = 
        this.priorityFilter === 'ALL' || 
        ticket.priority === this.priorityFilter;
this.cdr.detectChanges();
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }
  viewTicket(ticketId: string): void {
    this.router.navigate(['/viewTicket', ticketId]);
  }

}
