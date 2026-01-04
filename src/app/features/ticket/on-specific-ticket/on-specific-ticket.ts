import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.services';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TicketResponse } from '../../../models/ticket-response.model';

@Component({
  selector: 'app-on-specific-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './on-specific-ticket.html',
  styleUrl: './on-specific-ticket.css',
})
export class OnSpecificTicket {

  ticketId!: string;
  ticket!: TicketResponse;
  attachments: any[] = [];
  comments: any[] = [];
  loading = true;

  //see it is for agents 
  role = localStorage.getItem('role');
  isAgent = false;
  isManagerOrAdmin = false;
  newStatus = '';
  commentText = '';

  //for assigning
  assignedAgentId = '';

  isInternal = false
  statuses = [
    'OPEN', 'ASSIGNED', 'INPROGRESS', 'RESOLVED',
    'CLOSED', 'FAILED', 'ESCALATED', 'BREACHED', 'REOPEN'
  ];
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this.ticketId = this.route.snapshot.paramMap.get('id')!;
    //adding the roles for specific purposes
    this.isAgent =
      this.role === 'ROLE_AGENT' ||
      this.role === 'ROLE_ADMIN' ||
      this.role === 'ROLE_MANAGER';
    this.isManagerOrAdmin =
      this.role === 'ROLE_MANAGER' ||
      this.role === 'ROLE_ADMIN';
    this.loadAll();
  }

  loadAll() {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res: TicketResponse) => {
        this.ticket = res;
        this.loading = false;
        this.newStatus = res.status;
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

  // on-specific-ticket.ts
  downloadFile(file: any) {
    this.ticketService.downloadAttachment(file.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName; // Uses the filename from your backend response
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed', err);
        alert('Could not download file. Please check your permissions.');
      }
    });
  }



  //for updateing the status
  updateStatus() {
    if (!this.isAgent) return;

    this.ticketService
      .updateTicketStatus(this.ticketId, this.newStatus)
      .subscribe(() => {
        this.ticket.status = this.newStatus;
        alert('Status updated');
      });
  }



  //wirting of comments
  addComment() {
    if (!this.commentText.trim()) return;

    this.ticketService
      .addComment(this.ticketId, this.commentText, this.isInternal)
      .subscribe(() => {
        this.commentText = '';
        this.isInternal = false;
        this.refreshComments();
      });
  }

  assignTicket(): void {
    if (!this.assignedAgentId.trim()) return;

    this.ticketService.assignTicket({
      ticketId: this.ticketId,
      agentId: this.assignedAgentId
    }).subscribe({
      next: () => {
        alert('Ticket assigned successfully');
        this.assignedAgentId = '';
        this.loadAll();
      },
      error: () => {
        alert('Assignment failed');
      }
    });
  }

}
