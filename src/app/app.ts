import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, Event, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({ 
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule,SidebarComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showSidebar: boolean = true;
  constructor(private router: Router) {
    // Listen to route changes
   this.router.events.subscribe(event => {
  if (event instanceof NavigationEnd) {
    const url = event.urlAfterRedirects;

    if (url === '/login' || url === '/register') {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }
});
  }
  protected readonly title = signal('ticket_frontend');
}
