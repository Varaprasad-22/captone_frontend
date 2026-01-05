import { Component,ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../core/services/admin.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  users: any[] = [];
  selectedRole = 'ROLE_USER';
  loading = false;

  constructor(private adminService: AdminService,
    private cdr:ChangeDetectorRef
  ) {

    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getUsersByRole(this.selectedRole).subscribe({
      next: (response:any) => {
        this.users = response.content;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  toggleStatus(user: any) {
    const nextState = !user.active;
    this.adminService
      .toggleUserStatus(user.userId, nextState)
      .subscribe({
        next: () => {user.active = nextState,
        this.cdr.detectChanges()},
        error: err =>{ alert(err.error?.message || 'Operation failed'),
        this.cdr.detectChanges()}
      });
  }

  changeRole(user: any, newRole: string) {
  if (user.role === newRole) return;

  this.adminService.updateUserRole(user.userId, newRole)
    .subscribe({
      next: () =>{ user.role = newRole,this.cdr.detectChanges(),  this.loadUsers(); },
      error: err => alert(err.error?.message || 'Role update failed')
    });
}
  }
