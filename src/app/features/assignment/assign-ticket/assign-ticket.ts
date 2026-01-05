import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketResponse } from '../../../models/ticket-response.model';
import { TicketService } from '../../../core/services/ticket.services';
import { Priority } from '../../../models/assign-ticket.model';
import { AllUsersResponse } from '../../../models/all-users-response.model';
import { AgentWorkLoadResponse } from '../../../models/agent-workload.model';
import { AssignmentService } from '../../../core/services/assignment.services';
import { AuthService } from '../../../core/services/auth.services';
@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-ticket.html',
  styleUrl: './assign-ticket.css'
})
export class AssignTicket {

  ticketId!: string;

  agents: AllUsersResponse[] = [];
  workloads: Record<string, AgentWorkLoadResponse[]> = {};

  page = 0;
  size = 10;
  totalPages = 0;

  loading = true;
  priority: Priority = 'LOW';


  //reassign
  mode: 'assign' | 'reassign' = 'assign';


  constructor(
    private route: ActivatedRoute,
    private agentService: AssignmentService,
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.ticketId = this.route.snapshot.paramMap.get('ticketId')!;
this.mode =
  this.route.snapshot.queryParamMap.get('mode') === 'reassign'
    ? 'reassign'
    : 'assign';

    this.loadAgents();
  }

  loadAgents() {
    this.loading = true;

    this.authService.getAllAgents(this.page, this.size).subscribe({
      next: (response) => {
        this.agents = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;

        // load workload per agent
        this.agents.forEach(agent => {
          this.loadWorkload(agent.userId);
        });
        this.cdr.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  loadWorkload(agentId: string) {
    this.agentService.getAgentWorkload(agentId).subscribe({
      next: (response) => {
        this.workloads[agentId] = response,
        this.cdr.detectChanges();
      },
      error: () => this.workloads[agentId] = []
    });
  }

  assign(agentId: string) {
    this.assignmentService.assignTicket({
      ticketId: this.ticketId,
      agentId,
      priority: this.priority
    }).subscribe({
      next: () => {
        alert('Ticket assigned successfully');
        this.router.navigate(['/allopentickets']);
        this.cdr.detectChanges();
      },
      error: () => alert('Assignment failed')
    });
  }

  //reassign
    submit(agentId: string) {
    if (this.mode === 'assign') {
      this.assignmentService.assignTicket({
        ticketId: this.ticketId,
        agentId,
        priority: this.priority
      }).subscribe({
        next: () => {
          alert('Ticket assigned successfully');
          this.router.navigate(['/allopentickets']);
        },
        error: () => alert('Assignment failed')
      });
    } else {
      this.assignmentService.reassignTicket({
        ticketId: this.ticketId,
        newAgentId: agentId
      }).subscribe({
        next: () => {
          alert('Ticket reassigned successfully');
          this.router.navigate(['/allopentickets']);
        },
        error: () => alert('Reassignment failed')
      });
    }
  }

}
