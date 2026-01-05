import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlaEventService } from '../../../core/services/sla.event.services';

@Component({
  selector: 'app-sla-events',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './sla-events.html',
  styleUrl: './sla-events.css',
})
export class SlaEvents {

  events: any[] = [];

  page = 0;
  size = 10;
  totalPages = 0;

  agentId = '';
  

  // IMPORTANT FLAG
  isAgentSearch = false;

    constructor(private slaEventService: SlaEventService,
      private cdr:ChangeDetectorRef
    ) {
    this.loadEvents();   // ✅ ONLY PLACE CALLED ON INIT
  }

 loadEvents() {
  this.isAgentSearch = false;   
  this.slaEventService
    .getAllEvents(this.page, this.size)
    .subscribe({
      next: (res) => {
        console.log('PAGE RESPONSE:', res); // 👈 KEEP FOR DEBUG

        this.events = res.content;
        this.totalPages = res.totalPages;
this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('API ERROR', err);
      }
    });
}

reset() {
  this.agentId = '';       
  this.page = 0;            
  this.isAgentSearch = false;
  this.loadEvents();       
}

  searchByAgent() {
    if (!this.agentId) {
      this.page = 0;
      this.loadEvents();
          this.reset(); 
      return;
    }

    this.isAgentSearch = true;

    this.slaEventService.getEventsByAgent(this.agentId)
      .subscribe({
        next: res => {
          this.events = res;
          this.totalPages = 1;
          this.page = 0;
          this.cdr.detectChanges();
        },
        error: () => {}
      });
  }

  nextPage() {
    if (this.isAgentSearch) return;

    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadEvents();
      this.cdr.detectChanges()
    }
  }

  prevPage() {
    if (this.isAgentSearch) return;

    if (this.page > 0) {
      this.page--;
      this.loadEvents();
      this.cdr.detectChanges()
    }
  }

}
