import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFooterComponent } from '@/app/presenter/views/shared/components/common/organisms/main-footer/main-footer.component';

@Component({
  selector: 'app-travel-agent-layout',
  standalone: true,
  imports: [RouterOutlet, MainFooterComponent],
  templateUrl: './travel-agent-layout.component.html',
  styleUrl: './travel-agent-layout.component.scss',
})
export class TravelAgentLayoutComponent {}
