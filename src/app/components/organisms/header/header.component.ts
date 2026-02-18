import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { LevelFilterComponent } from '../../molecules/level-filter/level-filter.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { VerificationLevel } from '../../../models/asvs.model';

/**
 * Header Organism Component
 * Main navigation header with search and filtering capabilities
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, LevelFilterComponent, ButtonComponent],
  template: `
    <header class="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Bar: Logo and Title -->
        <div class="flex items-center justify-between py-4 border-b border-neutral-100">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-neutral-900">OWASP ASVS</h1>
              <p class="text-xs text-neutral-500">Application Security Verification Standard</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-neutral-600">
              <strong>{{ totalRequirements }}</strong> requirements
            </span>
            <button class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.5 1.5H21a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V3.5a2 2 0 012-2h7.5M12 8v6m-3-3h6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="py-4 space-y-4">
          <!-- Search Bar -->
          <div>
            <app-search-bar
              (search)="onSearch($event)"
              (searchChange)="onSearchChange($event)"
            ></app-search-bar>
          </div>

          <!-- Filter Options -->
          <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div class="flex-1 w-full">
              <p class="text-xs font-semibold text-neutral-600 uppercase mb-2">Verification Levels</p>
              <app-level-filter
                [selectedLevel]="selectedLevel"
                (levelSelected)="onLevelFilterChange($event)"
              ></app-level-filter>
            </div>
            <div class="flex items-center gap-2">
              <app-button
                variant="neutral"
                size="sm"
                (btnClick)="onResetFilters()"
              >
                Reset Filters
              </app-button>
              <app-button
                variant="primary"
                size="sm"
                (btnClick)="onExport()"
              >
                Export
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() totalRequirements = 0;
  @Input() selectedLevel: VerificationLevel | null = null;

  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() levelFilterChange = new EventEmitter<VerificationLevel | null>();
  @Output() resetFilters = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();

  onSearch(term: string): void {
    this.search.emit(term);
  }

  onSearchChange(term: string): void {
    this.searchChange.emit(term);
  }

  onLevelFilterChange(level: VerificationLevel | null): void {
    this.levelFilterChange.emit(level);
  }

  onResetFilters(): void {
    this.resetFilters.emit();
  }

  onExport(): void {
    this.export.emit();
  }
}
