import { ChangeDetectorRef, Component, computed, DestroyRef, inject, signal, Signal, WritableSignal } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef, private destroyRef: DestroyRef) { }

  products: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit(): void {
    this.apiService.fetchedProducts.subscribe({
      next: (data: Product[]) => {
        console.log("Push Called")
        this.cdr.detectChanges();
        this.products.update(previous => [...previous, ...data])
      }
    })
  }
}
