import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@/app/presenter/views/shared/layouts/main-layout/main-layout.component';
import { provideIcons } from '@ng-icons/core';
import { materialUIIcons } from '@/app/presenter/icons/providerIcons';
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ ...materialUIIcons })],
  providers: [MessageService, DialogService],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    this.primengConfig.setTranslation({
      clear: 'Limpiar',
      today: 'Hoy',
    });
  }
}
