import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.services';

@Component({
  selector: 'app-on-specific-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './on-specific-ticket.html',
  styleUrl: './on-specific-ticket.css',
})
export class OnSpecificTicket {

  ticketId!: string;
  ticket: any;
  attachments: any[] = [];
  comments: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {
    this.ticketId = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
  }

  loadAll() {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res) => {
        this.ticket = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.ticketService.getAttachments(this.ticketId).subscribe({
      next: (res) => {
        this.attachments = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.attachments = [];
        this.cdr.detectChanges();
      }
    });

    this.ticketService.getComments(this.ticketId).subscribe({
      next: (res) => {
        this.comments = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.comments = [];
        this.cdr.detectChanges();
      }
    });

  }

  refreshComments() {
    this.ticketService.getComments(this.ticketId).subscribe({
      next: (res) => {
        this.comments = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.comments = [];
        this.cdr.detectChanges();
      }
    });
  }
}
