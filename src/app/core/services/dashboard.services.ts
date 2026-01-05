import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UserDashboardResponse } from '../../models/user.dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private baseUrl = `${environment.apiGateway}/tickets`;
    constructor(private http: HttpClient) { }

 getUserDashboard(): Observable<UserDashboardResponse> {
    return this.http.get<UserDashboardResponse>(
      `${this.baseUrl}/my/dashboard`
    );
  }
}
