import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

/**
 * SearchBar Molecule Component
 * Combines input and button for searching functionality
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  template: `
    <div class="flex gap-2 w-full">
      <app-input
        type="search"
        placeholder="Search requirements..."
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        class="flex-1"
      ></app-input>
      <app-button
        variant="primary"
        size="md"
        (btnClick)="onSearch()"
        [disabled]="!searchTerm.trim()"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </app-button>
    </div>
  `,
})
export class SearchBarComponent {
  @Input() placeholder = 'Search requirements...';
  @Input() debounceMs = 300;

  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';
  private debounceTimer: any;

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchChange.emit(value);

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceMs);
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
}
