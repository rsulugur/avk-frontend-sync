import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuditService } from './audit.service';
import { Audit } from './audit.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-audit',
  standalone: true,
  templateUrl: './audit.component.html',
  imports: [DatePipe, CommonModule],
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  currentDate: Date = new Date();
  items: WritableSignal<Audit[]> = signal([]);
  destroyRef = inject(DestroyRef)
  recentSearchService = inject(AuditService);

  ngOnInit(): void {
    const subscription = this.recentSearchService.recentProducts$.subscribe({
      next: data => this.items.set(data)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
    this.recentSearchService.getRecentProducts();
  }
}
