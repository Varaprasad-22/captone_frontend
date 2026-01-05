import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TicketResponse } from '../../models/ticket-response.model';
import { AssignTicketRequest } from '../../models/assign-ticket.model';
import { AgentWorkLoadResponse } from '../../models/agent-workload.model';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {

    private baseUrl = `${environment.apiGateway}/assignments`;

    constructor(private http: HttpClient) { }

    getAgentWorkload(agentId: string): Observable<AgentWorkLoadResponse[]> {
        return this.http.get<AgentWorkLoadResponse[]>(
            `${this.baseUrl}/agents/${agentId}/workload`
        );
    }
    assignTicket(data: AssignTicketRequest) {
    return this.http.post(
      `${this.baseUrl}/assign`,
      data,
      { responseType: 'text' }
    );
  }

  //for re assigning 
    reassignTicket(payload: {
    ticketId: string;
    newAgentId: string;
  }) {
    return this.http.post(`${this.baseUrl}/reassign`, payload,    { responseType: 'text' });
  }

}
