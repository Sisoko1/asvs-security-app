import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button Atom Component
 * Base reusable button component with multiple variants and sizes
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick()"
      [ngClass]="getClasses()"
      class="font-medium rounded-md transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span *ngIf="loading" class="inline-block mr-2">
        <span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      </span>
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  onClick(): void {
    this.btnClick.emit();
  }

  getClasses(): string {
    const baseClasses = 'font-medium rounded-md transition-smooth focus-ring';
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();
    const widthClass = this.fullWidth ? 'w-full' : '';

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass}`;
  }

  private getSizeClasses(): string {
    const sizes: Record<ButtonSize, string> = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
      xl: 'px-6 py-3 text-xl',
    };
    return sizes[this.size];
  }

  private getVariantClasses(): string {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
      accent: 'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800',
      success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800',
      warning: 'bg-warning-600 text-white hover:bg-warning-700 active:bg-warning-800',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800',
      neutral: 'bg-neutral-600 text-white hover:bg-neutral-700 active:bg-neutral-800',
      ghost: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 active:bg-primary-100',
    };
    return variants[this.variant];
  }
}
