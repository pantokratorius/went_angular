import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('went_angular');
}
