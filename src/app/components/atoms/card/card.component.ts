import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'elevated' | 'flat' | 'outlined' | 'filled';

/**
 * Card Atom Component
 * Container component for organizing content with various visual styles
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="getClasses()" class="rounded-lg transition-smooth">
      <div *ngIf="header" class="px-6 py-4 border-b border-neutral-200">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="px-6 py-4">
        <ng-content></ng-content>
      </div>
      <div *ngIf="footer" class="px-6 py-4 border-t border-neutral-200">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() variant: CardVariant = 'elevated';
  @Input() hoverable = false;
  @Input() clickable = false;
  @Input() header = false;
  @Input() footer = false;

  getClasses(): string {
    const baseClasses = 'rounded-lg transition-smooth';
    const variantClasses = this.getVariantClasses();
    const interactiveClasses = this.getInteractiveClasses();

    return `${baseClasses} ${variantClasses} ${interactiveClasses}`;
  }

  private getVariantClasses(): string {
    const variants: Record<CardVariant, string> = {
      elevated: 'bg-white shadow-base',
      flat: 'bg-white',
      outlined: 'bg-white border border-neutral-200',
      filled: 'bg-neutral-100',
    };
    return variants[this.variant];
  }

  private getInteractiveClasses(): string {
    let classes = '';
    if (this.hoverable) {
      classes += ' hover:shadow-lg hover:elevation-4';
    }
    if (this.clickable) {
      classes += ' cursor-pointer hover:bg-neutral-50';
    }
    return classes;
  }
}
