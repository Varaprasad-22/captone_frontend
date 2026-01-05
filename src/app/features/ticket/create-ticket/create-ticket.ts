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

  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  ticketForm;
  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.ticketForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]
      ],
      Category: ['', Validators.required]
    });
  }
  readonly MAX_TOTAL_SIZE = 10 * 1024 * 1024;
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const selectedFiles = Array.from(input.files);

    const currentTotalSize = this.files.reduce((sum, f) => sum + f.size, 0);
    const selectedTotalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);

    if (currentTotalSize + selectedTotalSize > this.MAX_TOTAL_SIZE) {
      this.showToast('Total attachment size must not exceed 10MB', 'error');
      return;
    }

    this.files.push(...selectedFiles);
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
        this.showToast('Success', 'success');
        this.cdr.detectChanges();
        // redirect after few seconds
        setTimeout(() => {
          this.router.navigate(['/tickets/userTicket']);
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error || 'Ticket creation failed'
        this.showToast('failed ' + err.error, 'error');
        this.cdr.detectChanges();
      }
    });
  }

  //remove file 
  removeFile(index: number): void {
    this.files.splice(index, 1); // This removes the file at the given index
  }

  //side error succes part 
  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;

    // Auto close after 3 seconds
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }
  closeToast() {
    this.toastMessage = '';
  }
}

