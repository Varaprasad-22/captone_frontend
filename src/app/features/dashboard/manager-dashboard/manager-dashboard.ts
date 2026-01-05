import { Component,ChangeDetectorRef } from '@angular/core';
import {  ManagerDashboardService } from '../../../core/services/manager.dashboard.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboard {

  
  dashboard: any = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    escalated: 0,
    breached: 0
  };

  loading = true;

  constructor(private dashboardService: ManagerDashboardService,
    private cdr:ChangeDetectorRef
  ) {
    this.dashboardService.getAdminDashboard().subscribe({
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
