import { Component } from '@angular/core';
import { AdminService } from '../../../core/services/admin.services';

@Component({
  selector: 'app-view-profile',
  imports: [],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  users: any[] = [];
  selectedRole = 'ROLE_USER';
  loading = false;

  constructor(private adminService: AdminService) {

    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getUsersByRole(this.selectedRole).subscribe({
      next: res => {
        this.users = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleStatus(user: any) {
    const nextState = !user.active;
    this.adminService
      .toggleUserStatus(user.userId, nextState)
      .subscribe({
        next: () => user.active = nextState,
        error: err => alert(err.error?.message || 'Operation failed')
      });
  }
  }
