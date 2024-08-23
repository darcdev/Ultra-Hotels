import { Component } from '@angular/core';
import { MainHeaderComponent } from '@/app/presenter/views/shared/components/common/organisms/layout/main-header/main-header.component';
import { MainFooterComponent } from '@/app/presenter/views/shared/components/common/organisms/layout/main-footer/main-footer.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent,
    RouterOutlet,
    ToastModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
