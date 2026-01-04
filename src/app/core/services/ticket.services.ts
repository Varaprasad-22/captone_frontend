import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.services";
import { TicketResponse } from "../../models/ticket-response.model";
import { AssignTicketRequest } from "../../models/assign-ticket.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TicketService {

  private baseUrl = `${environment.apiGateway}/tickets`;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  createTicket(formData: FormData) {
    return this.http.post(`${this.baseUrl}/create`, formData, {
      responseType: 'text'
    });
  }

  getUserTickets() {
    const user = this.authService.getUser();
    const role = user.role ?? '';
    const userId = user.id ?? '';
    // const userId = localStorage.getItem('userId');
    if (role === 'ROLE_AGENT') {
      return this.http.get<any[]>(
        `${this.baseUrl}/${userId}/getAgentTickets`

      );
    }

    return this.http.get<any[]>(
      `${this.baseUrl}/${userId}/getTickets`
    );
  }

  getTicketById(ticketId: string) {
    return this.http.get<TicketResponse>(`${this.baseUrl}/${ticketId}/getTicket`);
  }

  getAttachments(ticketId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${ticketId}/attachments`);
  }

  getComments(ticketId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${ticketId}/getComments`);
  }


  // ticket.service.ts
  downloadAttachment(attachmentId: string) {
    return this.http.get(`${this.baseUrl}/attachments/view/${attachmentId}`, {
      responseType: 'blob'
    });
  }


  //for updating statuss
  updateTicketStatus(ticketId: string, status: string) {
    return this.http.put(`${this.baseUrl}/${ticketId}/status`, { status });
  }

  //for the writing of comments;
  addComment(ticketId: string, text: string, isInternal: boolean) {
    return this.http.post(
      `${this.baseUrl}/${ticketId}/comments`,
      {
        text,
        isInternal
      }
    );
  }

  //now for assigning ticket 
  assignTicket(data: AssignTicketRequest): Observable<string> {
    return this.http.post(
      `/assign`,
      data,
      { responseType: 'text' }
    );
  } 

getAllOpenTickets(): Observable<TicketResponse[]> {
  console.log('SERVICE METHOD HIT'); // 🔥 add this
  return this.http.get<TicketResponse[]>(`${this.baseUrl}/getAllOpenTickets`);
}

}