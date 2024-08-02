import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  apiService: ApiService = inject(ApiService);

  onSearch() {
    console.log(this.searchQuery);
    this.apiService.searchProducts(this.searchQuery);
  }
}
