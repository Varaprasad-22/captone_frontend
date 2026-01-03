import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TicketService {

  private baseUrl = `${environment.apiGateway}/tickets`;

  constructor(private http: HttpClient) {}

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
}