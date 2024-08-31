import { Component, inject, input, InputSignal, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../search-result/search-result.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [NgbDatepickerModule, CurrencyPipe],
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.css']
})
export class SearchOverlayComponent {
  product = {
    name: 'Rohith',
    image: 'hello',
    ratings: 4.8,
    price: "909",
    url: 'avin'
  }
  constructor(public activeModal: NgbActiveModal) { }
}
