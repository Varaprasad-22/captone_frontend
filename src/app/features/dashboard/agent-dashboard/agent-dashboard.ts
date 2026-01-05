import { Component } from '@angular/core';
import { AgentDashboardService } from '../../../core/services/agent.dashboard.services';

@Component({
  selector: 'app-agent-dashboard',
  imports: [],
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

  constructor(private dashboardService: AgentDashboardService) {
    this.dashboardService.getAgentDashboard().subscribe({
      next: (res: any) => {
        this.dashboard = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
