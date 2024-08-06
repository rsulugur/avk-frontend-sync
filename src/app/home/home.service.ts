import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Product } from './search-results/search-result/search-result.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = 'http://localhost:3000/products'; // Replace with your API URL
    // private apiUrl = 'http://localhost:8080/v1/fetch/products';
    fetchedProducts = new BehaviorSubject<Product[]>([]);
    isLoading: WritableSignal<boolean> = signal(false);

    constructor(private http: HttpClient) { }

    // Example GET method
    searchProducts(searchString: string): void {
        if (searchString.length < 2) {
            return
        }
        this.isLoading.set(true)
        this.fetchedProducts.next([])
        let params = new HttpParams().set('searchKey', searchString.replace(' ', ""));
        this.http
            .get<Product[]>(`${this.apiUrl}`, { params })
            .pipe(timeout(50000), catchError(this.handleError))
            .subscribe({
                next: data => {
                    console.log(data)
                    this.fetchedProducts.next(data)
                },
                error: err => this.isLoading.set(false),
                complete: () => this.isLoading.set(false)
            })
    }

    // Error handling method
    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error); // Replace with better error handling
        throw error;
    }
}
