import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.services';
import { AuthService } from '../../../core/services/auth.services'; // Import Auth
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TicketResponse } from '../../../models/ticket-response.model';
import { Priority } from '../../../models/assign-ticket.model';

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

  // roles 
  role = localStorage.getItem('role');
  currentUserEmail = ''; // for left and right parts so if ur msg on 1 side
  isAgent = false;
  isManagerOrAdmin = false;

  
  commentText = '';
  isInternal = false;

  showStatusModal = false;
  selectedStatus = '';
  statuses = [
    'OPEN', 'ASSIGNED', 'INPROGRESS', 'RESOLVED',
    'CLOSED', 'FAILED', 'ESCALATED', 'BREACHED', 'REOPEN'
  ];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.ticketId = this.route.snapshot.paramMap.get('id')!;
    
    // from the storage
    const user = this.authService.getUser();
    this.currentUserEmail = user?.email || ''; // Or username

    this.isAgent = this.role === 'ROLE_AGENT' || this.role === 'ROLE_ADMIN' || this.role === 'ROLE_MANAGER';
    this.isManagerOrAdmin = this.role === 'ROLE_MANAGER' || this.role === 'ROLE_ADMIN';
    
    this.loadAll();
  }

  loadAll() {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res: TicketResponse) => {
        this.ticket = res;
        this.loading = false;
        this.selectedStatus = res.status; // Init modal dropdown
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

    this.refreshComments();
  }

  refreshComments() {
    this.ticketService.getComments(this.ticketId).subscribe({
      next: (res) => {
        this.comments = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.comments = [];
      }
    });
  }

  downloadFile(file: any) {
    this.ticketService.downloadAttachment(file.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Download failed')
    });
  }

  // comments to wirte
  addComment() {
    if (!this.commentText.trim()) return;

    this.ticketService.addComment(this.ticketId, this.commentText, this.isInternal)
      .subscribe(() => {
        this.commentText = '';
        this.isInternal = false;
        this.refreshComments();
      });
  }

  //for changing this pop up needed
  openStatusModal() {
    this.selectedStatus = this.ticket.status; // Reset to current
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
  }

  confirmStatusChange() {
    this.ticketService.updateTicketStatus(this.ticketId, this.selectedStatus)
      .subscribe(() => {
        this.ticket.status = this.selectedStatus;
        this.showStatusModal = false;
        this.cdr.detectChanges();
        if(this.isManagerOrAdmin)
        this.router.navigate(['/getAllTickets'])
        else
        this.router.navigate(['/tickets/userTicket'])
        
      });
  }

  // these are for the manager part where he can assign /reaasign according to requirement and also by admin
  assignTicket(ticketId: string) {
    this.router.navigate(['/manager/assign', ticketId], { queryParams: { mode: 'assign' } });
  }

  reassignTicket(ticketId: string) {
    this.router.navigate(['/manager/assign', ticketId], { queryParams: { mode: 'reassign' } });
  }
}