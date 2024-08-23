import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { HotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-configuration/hotel-configuration.component';
import { NgIcon } from '@ng-icons/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { matHourglassEmpty } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-hotel-item',
  standalone: true,
  imports: [
    CardModule,
    Button,
    ButtonComponent,
    TagModule,
    MenuModule,
    HotelConfigurationComponent,
    NgIcon,
    IconComponent,
  ],
  templateUrl: './hotel-item.component.html',
  styleUrl: './hotel-item.component.scss',
})
export class HotelItemComponent {
  @Input() hotel!: HotelEntity;

  protected readonly matHourglassEmpty = matHourglassEmpty;
}
