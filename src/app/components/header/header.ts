import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header implements OnInit {

  public isDarkMode = signal<boolean>(true);

  ngOnInit(): void {
    this._loadDarkMode();
  }

  private _setTheme(): void {
    if (this.isDarkMode()) {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      document.documentElement.style.setProperty('color-scheme', 'light');
    }
  }

  private _loadDarkMode(): void {
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode.set(darkMode === 'true');
    this._setTheme();
  }

  public toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    this._setTheme();
    localStorage.setItem('darkMode', this.isDarkMode().toString());
  }
  
}
