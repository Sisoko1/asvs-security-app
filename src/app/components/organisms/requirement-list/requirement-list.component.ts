import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementCardComponent } from '../requirement-card/requirement-card.component';
import { EnhancedRequirement } from '../../../models/asvs.model';

/**
 * RequirementList Organism Component
 * Displays a list of requirements with pagination and loading states
 */
@Component({
  selector: 'app-requirement-list',
  standalone: true,
  imports: [CommonModule, RequirementCardComponent],
  template: `
    <!-- Empty State -->
    <div
      *ngIf="requirements.length === 0"
      class="text-center py-12 px-4"
    >
      <svg class="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h3.25A2 2 0 0110 2.75v.75m0 4v6m0 0v3a2 2 0 01-2 2H7" />
      </svg>
      <h3 class="text-lg font-semibold text-neutral-900 mb-1">No Requirements Found</h3>
      <p class="text-neutral-600">Try adjusting your filters or search terms.</p>
    </div>

    <!-- Requirements Grid -->
    <div
      *ngIf="requirements.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in"
    >
      <app-requirement-card
        *ngFor="let requirement of requirements; trackBy: trackByRequirementId"
        [requirement]="requirement"
        (click)="onRequirementClick(requirement)"
      ></app-requirement-card>
    </div>

    <!-- Results Info -->
    <div
      *ngIf="requirements.length > 0"
      class="mt-6 p-4 bg-neutral-50 rounded-lg flex items-center justify-between text-sm text-neutral-600"
    >
      <span>Showing <strong>{{ requirements.length }}</strong> requirement<span *ngIf="requirements.length !== 1">s</span></span>
      <span *ngIf="totalCount > 0" class="text-neutral-500">of <strong>{{ totalCount }}</strong> total</span>
    </div>
  `,
})
export class RequirementListComponent {
  @Input() requirements: EnhancedRequirement[] = [];
  @Input() totalCount = 0;
  @Input() loading = false;

  @Output() requirementClick = new EventEmitter<EnhancedRequirement>();

  onRequirementClick(requirement: EnhancedRequirement): void {
    this.requirementClick.emit(requirement);
  }

  trackByRequirementId(index: number, requirement: EnhancedRequirement): string {
    return requirement['#'];
  }
}
