import { Component } from '@angular/core';
import { SearchBarComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: '',
  standalone: true,
  imports: [SearchBarComponent, ResultsComponent, HeaderComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

}
