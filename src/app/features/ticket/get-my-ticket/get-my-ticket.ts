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
isAdminView=false;
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService:AuthService,
        private route: ActivatedRoute
  ) { this.checkContextAndLoad();}
checkContextAndLoad() {
    this.loading = true;
    const routeId = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.routeConfig?.path;

    // 1. Admin Viewing Agent Tickets
    if (path?.includes('admin/agent-tickets') && routeId) {
      this.isAdminView = true;
      this.isAgent = true; // Force agent view layout
      this.loadAgentTickets(routeId);
    } 
    // 2. Admin Viewing User Tickets
    else if (path?.includes('admin/user-tickets') && routeId) {
      this.isAdminView = true;
      this.isAgent = false; // Force user view layout
      this.loadUserTickets(routeId);
    }
    // 3. Logged in Agent viewing resolved tickets
    else if (path === 'tickets/resolvedTickets') {
      this.setupLoggedInUser();
      this.loadResolvedTickets();
    } 
    // 4. Default: Logged in User/Agent viewing their own tickets
    else {
      this.setupLoggedInUser();
      if(this.isAgent) {
         this.loadAgentTickets();
      } else {
         this.loadUserTickets();
      }
    }
  }
setupLoggedInUser() {
    const user = this.authService.getUser();
    this.role = user.role ?? '';
    this.isAgent = this.role === 'ROLE_AGENT';
  }
// Modified to accept ID
  loadUserTickets(targetId?: string) {
    this.ticketService.getUserTickets(targetId).subscribe({
      next: (res) => {
        this.tickets = res;
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

  loadAgentTickets(targetId?: string) {
    this.ticketService.getAgentTickets(targetId).subscribe({
      next: (res) => {
        this.tickets = res;
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
