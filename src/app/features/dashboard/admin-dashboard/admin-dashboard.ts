import { Component ,ChangeDetectorRef} from '@angular/core';
import { AdminDashboardService } from '../../../core/services/admin.dashboard.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  
  dashboard: any = {};
  loading = true;

  constructor(private dashboardService: AdminDashboardService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (res: any) => {
        this.dashboard = res;
        this.loading = false;
        this.cdr.detectChanges()
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
