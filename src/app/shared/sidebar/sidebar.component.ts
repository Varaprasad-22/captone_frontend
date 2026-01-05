import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.services'; // Adjust path

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  userRole: string = '';
  userName: string = '';
  dashboardRoute: string = '/dashboard';

  constructor(
    private authService: AuthService, 
    private router: Router
  )  {
    // 1. Get User Data
    const user = this.authService.getUser();
     
    // 2. Set Fallbacks if data is missing
    this.userRole = user?.role || 'ROLE_USER';
    this.userName = user?.name || 'User';

    // 3. Set Dynamic Dashboard Home based on Role
    this.setDashboardRoute();
  }

  setDashboardRoute() {
    switch (this.userRole) {
      case 'ROLE_ADMIN':
        this.dashboardRoute = '/admin/dashboard';
        break;
      case 'ROLE_MANAGER':
        this.dashboardRoute = '/manager/dashboard';
        break;
      case 'ROLE_AGENT':
        this.dashboardRoute = '/agent/dashboard';
        break;
      default:
        this.dashboardRoute = '/user/dashboard';
        break;
    }
  }

  logout() {
    // Clear storage/tokens
    this.authService.logout(); 
    // Redirect to login
    this.router.navigate(['/login']);
  }
}