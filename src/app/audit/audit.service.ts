import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Audit } from './audit.model';

@Injectable({
    providedIn: 'root'
})
export class AuditService {
    private apiUrl = 'http://localhost:8080/v1/recent';
    recentProducts$: BehaviorSubject<Audit[]> = new BehaviorSubject<Audit[]>([]);

    constructor(private http: HttpClient) { }

    // Example GET method
    getRecentProducts(): void {
        this.http
            .get<Audit[]>(`${this.apiUrl}`)
            .pipe(timeout(2000), catchError(this.handleError))
            .subscribe({
                next: data => this.recentProducts$.next(data)
            })
    }

    // Error handling method
    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error); // Replace with better error handling
        throw error;
    }
}
