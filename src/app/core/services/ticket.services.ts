import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TicketService {

  private baseUrl = `${environment.apiGateway}/tickets`;

  constructor(private http: HttpClient) { }

  createTicket(formData: FormData) {
    return this.http.post(`${this.baseUrl}/create`, formData, {
      responseType: 'text'
    });
  }

  getUserTickets() {
    const userId = localStorage.getItem('userId');
    return this.http.get<any[]>(
      `${this.baseUrl}/${userId}/getTickets`
    );
  }

  getTicketById(ticketId: string) {
    return this.http.get<any>(`${this.baseUrl}/${ticketId}/getTicket`);
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
updateTicketStatus(ticketId:string,status:string){
  return this.http.put(`${this.baseUrl}/${ticketId}/status`,{status});
}
}