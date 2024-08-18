import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@/app/presenter/views/shared/layouts/main-layout/main-layout.component';
import { provideIcons } from '@ng-icons/core';
import { materialUIIcons } from '@/app/presenter/icons/providerIcons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ ...materialUIIcons })],
})
export class AppComponent {}
