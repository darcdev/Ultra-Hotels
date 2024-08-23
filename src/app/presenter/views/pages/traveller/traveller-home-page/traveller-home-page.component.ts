import { Component } from '@angular/core';
import { FilterHotelsComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/filter-hotels/filter-hotels.component';
import { MapHotelsComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/map-hotels/map-hotels.component';

@Component({
  selector: 'app-traveller-home-page',
  standalone: true,
  imports: [FilterHotelsComponent, MapHotelsComponent],
  templateUrl: './traveller-home-page.component.html',
  styleUrl: './traveller-home-page.component.scss',
})
export class TravellerHomePageComponent {}
