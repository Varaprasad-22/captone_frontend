import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private baseUrl = `${environment.apiGateway}/auth`;


    constructor(private http: HttpClient) { }

    getUsersByRole(role: string): Observable<any[]> {
        return this.http.get<any>(`${this.baseUrl}/users/${role}`);
    }

    toggleUserStatus(userId: string, active: boolean): Observable<void> {
        return this.http.put<void>(
            `${this.baseUrl}/deactivate/${userId}`,
            { active }
        );
    }
      updateUserRole(userId: string, role: string) {
    return this.http.put<void>(
      `${this.baseUrl}/users/${userId}/role`,
      { role }
    );
  }
}
