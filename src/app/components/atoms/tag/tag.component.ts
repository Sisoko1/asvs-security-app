import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Tag Atom Component
 * Small label component for displaying metadata and categorization
 */
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getClasses()" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium">
      <span *ngIf="icon" class="flex-shrink-0">
        <svg [ngSwitch]="icon" class="w-4 h-4" fill="currentColor">
          <g *ngSwitchCase="'checkmark'">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
          </g>
          <g *ngSwitchCase="'warning'">
            <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM9 13a1 1 0 11-2 0 1 1 0 012 0zm.938-4.5a.75.75 0 00-1.5-1.5v2.5a.75.75 0 001.5 0v-1z"/>
          </g>
          <g *ngSwitchCase="'error'">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </g>
          <g *ngSwitchCase="'info'">
            <path d="M9 11a1 1 0 11-2 0 1 1 0 012 0zm4-7a4 4 0 11-8 0 4 4 0 018 0zM9 9a1 1 0 100-2 1 1 0 000 2z"/>
          </g>
        </svg>
      </span>
      <ng-content></ng-content>
    </span>
  `,
})
export class TagComponent {
  @Input() variant: TagVariant = 'default';
  @Input() icon: 'checkmark' | 'warning' | 'error' | 'info' | null = null;

  getClasses(): string {
    const variants: Record<TagVariant, string> = {
      default: 'bg-neutral-100 text-neutral-800',
      success: 'bg-success-100 text-success-800',
      warning: 'bg-warning-100 text-warning-800',
      danger: 'bg-danger-100 text-danger-800',
      info: 'bg-primary-100 text-primary-800',
    };
    return variants[this.variant];
  }
}
