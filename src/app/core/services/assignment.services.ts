import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TicketResponse } from '../../models/ticket-response.model';
import { AssignTicketRequest } from '../../models/assign-ticket.model';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {

    private baseUrl = `${environment.apiGateway}/assignments`;

    constructor(private http: HttpClient) { }


}
