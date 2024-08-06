import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from "./search-result/search-result.model"
import { ApiService } from '../home.service';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchResultComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  apiService: ApiService = inject(ApiService)
  destroyRef = inject(DestroyRef);
  products: Product[] = [];

  constructor() {
    const sub = this.apiService.fetchedProducts.subscribe({
      next: data => this.products = data
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe())
  }
}
