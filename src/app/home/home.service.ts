import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Product } from './search-results/search-result/search-result.model';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // private apiUrl = 'http://localhost:3000/products'; // Replace with your API URL
    private apiUrl = 'http://localhost:8080/v1/fetch/products';

    fetchedProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    isLoading: WritableSignal<boolean> = signal(false);

    private authService: AuthService = inject(AuthService);
    private toastr = inject(ToastrService);

    constructor(private http: HttpClient) { }

    searchProducts(searchString: string): void {
        if (searchString.length < 4) {
            this.toastr.error("Search query must be atleast 4 characters in length")
            return
        }
        this.isLoading.update(_ => true)
        this.fetchedProducts.next([]);
        let params = new HttpParams().set('searchKey', searchString);

        // this.http
        //     .get(`${this.apiUrl}`, {
        //         headers: { 'Accept': 'text/event-stream' },
        //         observe: 'events',
        //         params: params,
        //         responseType: 'text',
        //     })
        //     .pipe(map((d: any) => {
        //         return d['body'];
        //     }))
        //     .subscribe({
        //         next: data => {
        //             console.log(data)
        //             // const product:   [] = JSON.parse(data.split(":")[1]);
        //             // console.log("Data Fetched", product)
        //             // this.fetchedProductsSignal.update(oldData => [...oldData,])
        //         },
        //         error: err => {
        //             this.isLoading.set(false);
        //             console.log(err)
        //             if (err.status === 401) {
        //                 // As the token is expired we have to clear the credentials.
        //                 this.authService.logout();
        //             }
        //         },
        //         complete: () => this.isLoading.set(false)
        //     })
        this.getStream(searchString).subscribe(
            {
                next: (newProducts: Product[]) => {
                    this.fetchedProducts.next(newProducts);
                },
                error: (err) => {
                    this.isLoading.set(false);
                },
                complete: () => {
                    this.isLoading.set(false);
                }
            }
        )
    }

    getStream(searchKey: string): Observable<any> {
        const urlWithParams = `${this.apiUrl}?searchKey=${searchKey}`;
        return new Observable((observer) => {
            const eventSource = new EventSource(urlWithParams);
            eventSource.onmessage = (event) => {
                try {
                    const products: Product[] = JSON.parse(event.data);
                    observer.next(products);
                } catch (error) {
                    observer.error('Error parsing product data');
                }
            };
            eventSource.onerror = (error) => {
                observer.complete();
                eventSource.close();
            };

            // Return cleanup logic
            return () => {
                observer.complete();
                eventSource.close();
            };
        });
    }

    // Error handling method
    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error); // Replace with better error handling
        throw error;
    }
}
