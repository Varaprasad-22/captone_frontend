import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { PageResponse } from '../../models/page-response.model';
import { AllUsersResponse } from '../../models/all-users-response.model';

interface JwtPayload {
    sub: string;
    role: string;
    email: string;
    name: string;
    exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl = `${environment.apiGateway}/auth`;

    constructor(private http: HttpClient) { }

    login(data: any) {
        return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
            tap(res => {
                const token = res.token;

                const decoded = jwtDecode<JwtPayload>(token);

                localStorage.setItem('token', token);
                localStorage.setItem('role', decoded.role);
                localStorage.setItem('email', decoded.email);
                localStorage.setItem('name', decoded.name);
                localStorage.setItem('userId', decoded.sub);

            })
        );
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getUser() {
        return {
            id: localStorage.getItem('userId'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            role: localStorage.getItem('role')
        };
    }

    //import as it gets agent 
    getAllAgents(
        page = 0,
        size = 10,
        sortBy = 'role.name',
        direction = 'ASC'
    ): Observable<PageResponse<AllUsersResponse>> {
        return this.http.get<PageResponse<AllUsersResponse>>(
            `${this.baseUrl}/getAgents?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
        );
    }

  register(payload: any) {
    return this.http.post(
      `${this.baseUrl}/register`,
      payload,
      { responseType: 'text' } 
    );
  }
    
}
