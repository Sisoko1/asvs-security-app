import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../atoms/card/card.component';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { AsvsCategory } from '../../../models/asvs.model';

/**
 * CategoryCard Molecule Component
 * Displays a category with count and action button
 */
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <app-card variant="outlined" [hoverable]="true" [clickable]="true">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-semibold text-neutral-900">{{ categoryName }}</h3>
        <app-badge variant="primary" size="md">
          {{ count }} items
        </app-badge>
      </div>
      <p class="text-neutral-600 text-sm mb-4">{{ description }}</p>
      <div class="flex gap-2">
        <app-button
          variant="primary"
          size="sm"
          (btnClick)="onViewClick()"
        >
          View Requirements
        </app-button>
        <app-button
          variant="ghost"
          size="sm"
          (btnClick)="onMoreClick()"
        >
          More Info
        </app-button>
      </div>
    </app-card>
  `,
})
export class CategoryCardComponent {
  @Input() category!: AsvsCategory;
  @Input() categoryName!: string;
  @Input() count!: number;
  @Input() description = '';

  @Output() viewRequirements = new EventEmitter<AsvsCategory>();
  @Output() moreInfo = new EventEmitter<AsvsCategory>();

  onViewClick(): void {
    this.viewRequirements.emit(this.category);
  }

  onMoreClick(): void {
    this.moreInfo.emit(this.category);
  }
}
