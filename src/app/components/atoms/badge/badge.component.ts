import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge Atom Component
 * Small label component for displaying status, tags, and categories
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getClasses()" class="inline-flex items-center font-medium rounded-full">
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() outlined = false;

  getClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-smooth';
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();

    return `${baseClasses} ${sizeClasses} ${variantClasses}`;
  }

  private getSizeClasses(): string {
    const sizes: Record<BadgeSize, string> = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };
    return sizes[this.size];
  }

  private getVariantClasses(): string {
    if (this.outlined) {
      const outlined: Record<BadgeVariant, string> = {
        primary: 'border border-primary-600 text-primary-600 bg-primary-50',
        secondary: 'border border-secondary-600 text-secondary-600 bg-secondary-50',
        accent: 'border border-accent-600 text-accent-600 bg-accent-50',
        success: 'border border-success-600 text-success-600 bg-success-50',
        warning: 'border border-warning-600 text-warning-600 bg-warning-50',
        danger: 'border border-danger-600 text-danger-600 bg-danger-50',
        neutral: 'border border-neutral-600 text-neutral-600 bg-neutral-50',
      };
      return outlined[this.variant];
    }

    const solid: Record<BadgeVariant, string> = {
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-800',
      accent: 'bg-accent-100 text-accent-800',
      success: 'bg-success-100 text-success-800',
      warning: 'bg-warning-100 text-warning-800',
      danger: 'bg-danger-100 text-danger-800',
      neutral: 'bg-neutral-100 text-neutral-800',
    };
    return solid[this.variant];
  }
}
