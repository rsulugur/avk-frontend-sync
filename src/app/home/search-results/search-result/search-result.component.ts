import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './search-result.pipe';
import { Product } from './search-result.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { generateRandomString } from 'src/app/utils/apputils';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, TruncatePipe, NgxPaginationModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  product: InputSignal<Product> = input.required();
  randomid: string = generateRandomString(5);
  p: number = 1;
  sortDirection: { 'price': boolean } = { 'price': true };

  sortProduct(sortKey: 'price'): void {
    const direction = this.sortDirection[sortKey] ? 1 : -1;
    this.sortDirection[sortKey] = !this.sortDirection[sortKey];
    this.product().links.sort((a, b) => direction * (a.price - b.price));
  }
}
