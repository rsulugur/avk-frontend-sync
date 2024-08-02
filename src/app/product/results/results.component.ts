import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../product.model';
import { ApiService } from '../api.service';
import { TruncatePipe } from './results.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, TruncatePipe, FormsModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);
  sortDirection: 'asc' | 'desc' = 'desc'
  products = signal<Product[]>([]);
  checkboxTicked = '';

  ngOnInit(): void {
    const subscription = this.apiService.fetchedProducts.subscribe(
      {
        next: (data) => {
          this.products.set(data);
        }
      }
    )

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  navigateTo(productURL: string) {
    window.open(productURL, '_blank');
  }

  changeSortDirection() {
    if (this.sortDirection === 'asc') {
      this.products.set(this.products().sort((a, b) => a.price - b.price));
      this.sortDirection = 'desc'
    }
    else {
      this.products.set(this.products().sort((a, b) => b.price - a.price));
      this.sortDirection = 'asc'
    }
  }
}
