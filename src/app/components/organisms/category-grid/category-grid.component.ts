import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../molecules/category-card/category-card.component';
import { AsvsCategory } from '../../../models/asvs.model';

/**
 * CategoryGrid Organism Component
 * Displays all ASVS categories in a responsive grid
 */
@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold text-neutral-900 mb-2">ASVS Categories</h2>
        <p class="text-neutral-600">Explore security verification requirements by category</p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <app-category-card
          *ngFor="let item of categories; trackBy: trackByCategoryName"
          [category]="item.category"
          [categoryName]="item.name"
          [count]="item.count"
          [description]="item.description"
          (viewRequirements)="onViewRequirements($event)"
          (moreInfo)="onMoreInfo($event)"
        ></app-category-card>
      </div>

      <!-- Stats -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg">
          <p class="text-sm text-primary-600 font-semibold uppercase">Total Requirements</p>
          <p class="text-3xl font-bold text-primary-700 mt-2">{{ totalRequirements }}</p>
        </div>
        <div class="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-lg">
          <p class="text-sm text-secondary-600 font-semibold uppercase">Categories</p>
          <p class="text-3xl font-bold text-secondary-700 mt-2">{{ categories.length }}</p>
        </div>
        <div class="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-lg">
          <p class="text-sm text-success-600 font-semibold uppercase">Compliance Levels</p>
          <p class="text-3xl font-bold text-success-700 mt-2">3</p>
        </div>
      </div>
    </div>
  `,
})
export class CategoryGridComponent {
  @Input() categories: Array<{
    category: AsvsCategory;
    name: string;
    count: number;
    description: string;
  }> = [];
  @Input() totalRequirements = 0;

  @Output() viewRequirements = new EventEmitter<AsvsCategory>();
  @Output() moreInfo = new EventEmitter<AsvsCategory>();

  onViewRequirements(category: AsvsCategory): void {
    this.viewRequirements.emit(category);
  }

  onMoreInfo(category: AsvsCategory): void {
    this.moreInfo.emit(category);
  }

  trackByCategoryName(index: number, item: any): string {
    return item.category;
  }
}
