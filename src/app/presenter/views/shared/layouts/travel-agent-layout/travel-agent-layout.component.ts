import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFooterComponent } from '@/app/presenter/views/shared/components/common/organisms/layout/main-footer/main-footer.component';
import { MainHeaderComponent } from '@/app/presenter/views/shared/components/common/organisms/layout/main-header/main-header.component';

@Component({
  selector: 'app-travel-agent-layout',
  standalone: true,
  imports: [RouterOutlet, MainFooterComponent, MainHeaderComponent],
  templateUrl: './travel-agent-layout.component.html',
  styleUrl: './travel-agent-layout.component.scss',
})
export class TravelAgentLayoutComponent {}
