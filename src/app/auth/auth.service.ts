import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean = false;
    private destroyRef: DestroyRef = inject(DestroyRef);
    private toastr = inject(ToastrService);

    constructor(private router: Router, private http: HttpClient) {
        // Check if user is already logged in (e.g., based on a token in local storage)
        const token = sessionStorage.getItem('X-Auth-Token');
        this.isLoggedInSubject.next(!!token);
    }

    login(username: string, password: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ username, password });
        this.isLoading = true;
        const sub = this.http.post<any>('http://localhost:8080/auth/login', body, { headers })
            .subscribe({
                next: response => {
                    const token = response.token;
                    this.isLoggedInSubject.next(true);
                    sessionStorage.setItem('X-Auth-Token', token);
                    sessionStorage.setItem('X-Auth-Username', username);
                    this.router.navigate(['/'], { replaceUrl: true });
                },
                error: (e) => {
                    this.isLoading = false;
                    this.toastr.error(e.error.message);
                },
                complete: () => {
                    this.isLoading = false;
                }
            })

        this.destroyRef.onDestroy(() => sub.unsubscribe());
    }

    signup(userdata: { email: string, password: string, confirmPassword: string }) {
        if (userdata.password != userdata.confirmPassword) {
            this.toastr.info("passwords do not match please try again!!.");
            return
        }
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ email: userdata.email, password: userdata.password });
        this.isLoading = true;
        const sub = this.http.post<any>('http://localhost:8080/auth/signup', body, { headers })
            .subscribe({
                next: response => {
                    this.toastr.success(response.message);

                },
                error: (e) => {
                    this.toastr.error(e.error.message);
                    this.isLoading = false;
                    console.log("Error", e)
                },
                complete: () => {
                    this.isLoading = false;
                }
            })

        this.destroyRef.onDestroy(() => sub.unsubscribe());
    }

    logout(): void {
        sessionStorage.removeItem('X-Auth-Token');
        sessionStorage.removeItem('X-Auth-Username');
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login'], { replaceUrl: true });
    }

    isLoggedIn(): boolean {
        const jwtToken = sessionStorage.getItem('X-Auth-Token');
        return !!jwtToken;
    }
}
