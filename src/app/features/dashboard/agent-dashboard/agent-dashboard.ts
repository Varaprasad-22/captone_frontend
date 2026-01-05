import { Component,ChangeDetectorRef } from '@angular/core';
import { AgentDashboardService } from '../../../core/services/agent.dashboard.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css',
})
export class AgentDashboard {

  
  dashboard: any = {
    totalTickets: 0,
    active: 0,
    breached: 0,
    escalations: 0
  };

  loading = true;

  constructor(private dashboardService: AgentDashboardService,
    private cdr:ChangeDetectorRef
  ) {
    this.dashboardService.getAgentDashboard().subscribe({
      next: (res: any) => {
        this.dashboard = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
