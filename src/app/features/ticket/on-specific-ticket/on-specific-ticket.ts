import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    private ticketService: TicketService
  ) {
     this.ticketId = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
  }

  loadAll() {
    this.ticketService.getTicketById(this.ticketId).subscribe(res => {
      this.ticket = res;
      this.loading = false;
    });

    this.ticketService.getAttachments(this.ticketId)
      .subscribe(res => this.attachments = res);

    this.ticketService.getComments(this.ticketId)
      .subscribe(res => this.comments = res);
  }

  refreshComments() {
    this.ticketService.getComments(this.ticketId)
      .subscribe(res => this.comments = res);
  }
}
