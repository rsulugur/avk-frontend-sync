import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/home/home.service';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = 'Macbook';
  apiService: ApiService = inject(ApiService);
  checkboxGroups = [
    [
      { id: 'flexCheckDefault1', value: 'amazon', label: 'Amazon', selected: false },
      { id: 'flexCheckChecked1', value: 'ebay', label: 'Ebay', selected: true },
      { id: 'flexCheckChecked1', value: 'walmart', label: 'Walmart', selected: true }
    ],
    [
      { id: 'flexCheckChecked2', value: 'bestbuy', label: 'Best Buy', selected: true },
      { id: 'flexCheckChecked3', value: 'newegg', label: 'New Egg', selected: true }
    ]
  ];

  onSearch() {
    this.apiService.searchProducts(this.searchQuery);
  }
  getSelectedCheckboxes() {
    const selected = this.checkboxGroups.flat().filter(checkbox => checkbox.selected);
    console.log('Selected Checkboxes:', selected);
    // You can further process the selected checkboxes as needed
  }
}