import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {

  public isDarkMode = signal<boolean>(localStorage.getItem('darkMode') === 'true' || true);

  public toggleDarkMode(): void {

    if (this.isDarkMode()) {
      document.documentElement.style.setProperty('color-scheme', 'light');
    } else {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }

    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('darkMode', this.isDarkMode().toString());
  }
  
}
