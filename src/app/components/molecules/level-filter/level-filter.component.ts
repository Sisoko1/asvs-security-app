import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationLevel } from '../../../models/asvs.model';

/**
 * LevelFilter Molecule Component
 * Provides filter buttons for ASVS verification levels
 */
@Component({
  selector: 'app-level-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2 flex-wrap">
      <button
        *ngFor="let level of levels"
        (click)="onLevelClick(level)"
        [ngClass]="getButtonClasses(level)"
        class="px-4 py-2 rounded-md font-medium text-sm transition-smooth focus-ring"
      >
        {{ getLevelLabel(level) }}
      </button>
    </div>
  `,
})
export class LevelFilterComponent {
  @Input() levels: VerificationLevel[] = [
    VerificationLevel.LEVEL_1,
    VerificationLevel.LEVEL_2,
    VerificationLevel.LEVEL_3,
  ];
  @Input() selectedLevel: VerificationLevel | null = null;

  @Output() levelSelected = new EventEmitter<VerificationLevel | null>();

  onLevelClick(level: VerificationLevel): void {
    const newLevel = this.selectedLevel === level ? null : level;
    this.levelSelected.emit(newLevel);
  }

  getButtonClasses(level: VerificationLevel): string {
    if (this.selectedLevel === level) {
      return 'bg-primary-600 text-white hover:bg-primary-700';
    }
    return 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300';
  }

  getLevelLabel(level: VerificationLevel): string {
    const labels: Record<VerificationLevel, string> = {
      [VerificationLevel.LEVEL_1]: 'Level 1 (Opportunistic)',
      [VerificationLevel.LEVEL_2]: 'Level 2 (Standard)',
      [VerificationLevel.LEVEL_3]: 'Level 3 (Advanced)',
    };
    return labels[level];
  }
}
