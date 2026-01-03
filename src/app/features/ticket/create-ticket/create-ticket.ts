import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.services';

@Component({
  selector: 'app-create-ticket',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicketComponent {
  categories = [
    'HARDWARE',
    'SOFTWARE',
    'NETWORK',
    'ACCOUNT',
    'PAYMENT',
    'OTHER'
  ];
   files: File[] = [];
  errorMessage = '';
  successMessage = '';

  ticketForm ;
  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {
    this.ticketForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    Category: ['', Validators.required]
  });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

  submit() {
    if (this.ticketForm.invalid) return;
    this.errorMessage = '';
    this.successMessage = '';
    const ticketJson = {
      title: this.ticketForm.value.title,
      description: this.ticketForm.value.description,
      Category: this.ticketForm.value.Category
    };

    const formData = new FormData();


    formData.append(
      'ticket',
      new Blob([JSON.stringify(ticketJson)], {
        type: 'application/json'
      })
    );

    this.files.forEach(file => {
      formData.append('files', file);
    });

    this.ticketService.createTicket(formData).subscribe({
      next: (ticketId: string) => {
        this.successMessage = `Ticket created successfully. Ticket ID: ${ticketId}`;

        this.cdr.detectChanges();
        // optional: redirect after few seconds
        setTimeout(() => {
          this.router.navigate(['/tickets/my']);
        }, 2000);
      },
      error: err =>
        this.errorMessage = err.error?.message || 'Ticket creation failed'
    });
  }
}

