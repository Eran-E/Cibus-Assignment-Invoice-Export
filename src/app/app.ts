import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
