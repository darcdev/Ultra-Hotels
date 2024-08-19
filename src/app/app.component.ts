import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@/app/presenter/views/shared/layouts/main-layout/main-layout.component';
import { provideIcons } from '@ng-icons/core';
import { materialUIIcons } from '@/app/presenter/icons/providerIcons';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ ...materialUIIcons })],
  providers: [MessageService],
})
export class AppComponent {}
