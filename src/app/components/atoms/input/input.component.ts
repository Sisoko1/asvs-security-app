import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel';
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input Atom Component
 * Text input component with support for various types and sizes
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="w-full">
      <label *ngIf="label" [for]="inputId" class="block text-sm font-medium text-neutral-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-danger-600">*</span>
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [required]="required"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        [ngClass]="getClasses()"
        class="w-full px-4 py-2 rounded-md border transition-smooth focus-ring"
      />
      <p *ngIf="error" class="text-sm text-danger-600 mt-1">{{ error }}</p>
      <p *ngIf="hint && !error" class="text-sm text-neutral-500 mt-1">{{ hint }}</p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() error = '';
  @Input() hint = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string): void {
    this.onChange(value);
    this.onTouched();
  }

  getClasses(): string {
    const baseClasses = 'border transition-smooth';
    const sizeClasses = this.getSizeClasses();
    const stateClasses = this.getStateClasses();

    return `${baseClasses} ${sizeClasses} ${stateClasses}`;
  }

  private getSizeClasses(): string {
    const sizes: Record<InputSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
    };
    return sizes[this.size];
  }

  private getStateClasses(): string {
    if (this.error) {
      return 'border-danger-500 bg-danger-50 focus:border-danger-600';
    }
    if (this.disabled) {
      return 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed';
    }
    return 'border-neutral-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200';
  }
}
