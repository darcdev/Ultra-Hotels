import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-configuration/hotel-configuration.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenerateReservationComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/generate-reservation/generate-reservation.component';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { Observable } from 'rxjs';
import { SearchHotelsFilterState } from '@/app/presenter/state/searchHotelsFilter';
import { Store } from '@ngxs/store';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-list-filter-item',
  standalone: true,
  imports: [
    CardModule,
    HotelConfigurationComponent,
    IconComponent,
    PrimeTemplate,
    TagModule,
    ButtonComponent,
  ],
  templateUrl: './list-filter-item.component.html',
  styleUrl: './list-filter-item.component.scss',
  providers: [MessageService],
})
export class ListFilterItemComponent implements OnInit {
  @Input({ required: true }) hotel!: HotelEntity;

  refGenerateReservationModal: DynamicDialogRef | undefined;

  actualSearchHotel: HotelFilterModel | null = null;
  actualSearchHotel$: Observable<HotelFilterModel | null>;
  actualUserSession: Session | null = null;

  constructor(
    public dialogService: DialogService,
    private store: Store,
    private mesaageService: MessageService,
    private userSessionService: SessionUserService
  ) {
    this.userSessionService.session$.subscribe(session => {
      this.actualUserSession = session;
    });

    this.actualSearchHotel$ = this.store.select(
      SearchHotelsFilterState.getActualSearchHotelFilter
    );
  }

  ngOnInit() {
    this.actualSearchHotel$.subscribe(actualSearchFilterHotel => {
      this.actualSearchHotel = actualSearchFilterHotel;
    });
  }

  openReservationModal() {
    this.refGenerateReservationModal = this.dialogService.open(
      GenerateReservationComponent,
      {
        header: 'Habitaciónes disponibles para reservar',
        width: '30rem',
        breakpoints: {
          '769px': '90%',
        },
        data: {
          hotel: this.hotel,
        },
      }
    );
    this.refGenerateReservationModal.onClose.subscribe(
      (data: { success: boolean }) => {
        if (data?.success) {
          this.mesaageService.add({
            severity: 'success',
            summary: 'Reservación completada',
            detail: 'La reservación se ha completado con éxito',
          });
        }
      }
    );
  }
}
