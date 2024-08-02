import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RecentSearchService } from './recent.service';
import { Product } from '../product/product.model';
import { Audit } from './audit.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-recent',
  standalone: true,
  templateUrl: './recent.component.html',
  imports: [DatePipe, CommonModule],
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  currentDate: Date = new Date();
  items: WritableSignal<Audit[]> = signal([]);
  destroyRef = inject(DestroyRef)
  recentSearchService = inject(RecentSearchService);

  ngOnInit(): void {
    const subscription = this.recentSearchService.recentProducts$.subscribe({
      next: data => this.items.set(data)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
    this.recentSearchService.getRecentProducts();
  }
}
