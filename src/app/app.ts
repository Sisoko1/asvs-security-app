import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root App Component
 * Main application component that handles routing
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class App {}
