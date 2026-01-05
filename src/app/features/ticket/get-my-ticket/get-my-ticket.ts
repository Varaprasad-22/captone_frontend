import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.services';

@Component({
  selector: 'app-get-my-ticket',
  imports: [CommonModule],
  templateUrl: './get-my-ticket.html',
  styleUrl: './get-my-ticket.css',
})
export class GetMyTicket {

  tickets:any[]=[];
  loading=false;
  errorMessage='';
    resolvedTickets: any[] = [];

  role!:string;
  isAgent=false;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService:AuthService,
        private route: ActivatedRoute
  ) {
    const user = this.authService.getUser();
this.role = user.role ?? ''; 
    this.isAgent = this.role === 'ROLE_AGENT';

    if (this.route.snapshot.routeConfig?.path === 'tickets/userTicket') {
      this.loadTickets();
    } else if (this.route.snapshot.routeConfig?.path === 'tickets/resolvedTickets') {
      this.loadResolvedTickets();
    }
  }

  loadTickets(){


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

  loadResolvedTickets() {
    this.ticketService.getAgentResolvedTickets().subscribe({
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

  goToCreate(){
    this.router.navigate(['tickets/create'])
  }
}
