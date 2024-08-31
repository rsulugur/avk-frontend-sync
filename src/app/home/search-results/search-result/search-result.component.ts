import { Component, inject, input, InputSignal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './search-result.pipe';
import { Product } from './search-result.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { generateRandomString } from 'src/app/utils/apputils';
import { ModalDismissReasons, NgbActiveModal, NgbDatepicker, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchOverlayComponent } from '../search-overlay/search-overlay.component';
// import { SearchOverlayComponent } from '../search-overlay/search-overlay.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, TruncatePipe, NgxPaginationModule, NgbDatepickerModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  product: InputSignal<Product> = input.required();
  source2image = {
    'amazon': "https://s3-symbol-logo.tradingview.com/amazon--600.png",
    'ebay': 'https://cdn.iconscout.com/icon/free/png-256/free-ebay-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-2-pack-logos-icons-2944843.png?f=webp'
  }
  randomid: string = generateRandomString(5);
  p: number = 1;
  private modalService = inject(NgbModal);
  closeResult = '';
  sortDirection: { 'price': boolean } = { 'price': true };

  open() {
    console.log("Open Called")
    const modalRef = this.modalService.open(SearchOverlayComponent);
    // modalRef.componentInstance.product = {
    //   name: 'Rohith',
    //   image: 'hello',
    //   ratings: 4.8,
    //   price: "909",
    //   url: 'avin'
    // }
  }
  sortProduct(sortKey: 'price'): void {
    const direction = this.sortDirection[sortKey] ? 1 : -1;
    this.sortDirection[sortKey] = !this.sortDirection[sortKey];
    // this.product().links.sort((a, b) => direction * (a.price - b.price));
  }
}