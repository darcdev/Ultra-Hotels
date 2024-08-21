import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ManageHotelsViewComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/manage-hotels-view.component';
import { HotelsBookingByAgentViewComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/hotels-booking-by-agent-view/hotels-booking-by-agent-view.component';

@Component({
  selector: 'app-travel-agent-home-page',
  standalone: true,
  imports: [
    TabViewModule,
    IconComponent,
    ManageHotelsViewComponent,
    HotelsBookingByAgentViewComponent,
  ],
  templateUrl: './travel-agent-page.component.html',
  styleUrl: './travel-agent-page.component.scss',
})
export class TravelAgentPageComponent {}
