import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { Observable } from 'rxjs';


interface ProductLink {
  url: string;
  price: number;
}

interface Product {
  productName: string;
  productDescription: string;
  links: ProductLink[];
}
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  private apiUrl = 'http://localhost:3000/products'; // URL to JSON server
  destroyRef = inject(DestroyRef);
  products: Product[] = [];
  sortDirection: { 'price': boolean, 'link': boolean }[] = [];


  constructor(private http: HttpClient) {
    const sub = this.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.sortDirection = data.map(_ => { return { 'price': true, 'link': true } });
        this.products.forEach((product, idx) => this.sortProduct('price', idx))
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe())
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  sortProduct(sortKey: 'price' | 'link', index: number): void {
    const direction = this.sortDirection[index][sortKey] ? 1 : -1;
    this.sortDirection[index][sortKey] = !this.sortDirection[index][sortKey];
    this.products[index].links.sort((a, b) => {
      if (sortKey === 'price') {
        return direction * (a.price - b.price);
      } else if (sortKey === 'link') {
        return direction * (a.url.localeCompare(b.url))
      }
      return 0;
    });
  }
}
