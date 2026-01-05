import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class SlaEventService {
    private baseUrl = `${environment.apiGateway}/sla-events`;
    constructor(private http: HttpClient) { }

  getAllEvents(
    page: number,
    size: number,
    sortBy = 'occurredAt',
    direction = 'DESC'
  ) {
    return this.http.get<any>(
      `${this.baseUrl}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
         {
      responseType: 'json'  
    }
    );
  }

    getEventsByAgent(agentId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/agent/${agentId}`);
    }
}
