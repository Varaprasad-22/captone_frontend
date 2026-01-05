import { Component,ChangeDetectorRef } from '@angular/core';
import { UserDashboardResponse } from '../../models/user.dashboard.model';
import { DashboardService } from '../../core/services/dashboard.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  dashboard!: UserDashboardResponse;
  loading = true;
  error = false;

  constructor(private dashboardService: DashboardService,
    private cdr:ChangeDetectorRef
  ) {
    this.dashboardService.getUserDashboard().subscribe({
      next: (response) => {
        this.dashboard = response;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
