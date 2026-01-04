import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketResponse } from '../../../models/ticket-response.model';
import { TicketService } from '../../../core/services/ticket.services';
@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-ticket.html',
  styleUrl: './assign-ticket.css'
})
export class AssignTicket{

 
}
