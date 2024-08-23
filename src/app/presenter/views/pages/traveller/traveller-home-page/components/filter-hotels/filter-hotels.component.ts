import { Component } from '@angular/core';
import { SearchFilterHotelComponentComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/filter-hotels/search-filter-hotel-component/search-filter-hotel-component.component';
import { ListFilterHotelsComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/filter-hotels/list-filter-hotels/list-filter-hotels.component';

@Component({
  selector: 'app-filter-hotels',
  standalone: true,
  imports: [SearchFilterHotelComponentComponent, ListFilterHotelsComponent],
  templateUrl: './filter-hotels.component.html',
  styleUrl: './filter-hotels.component.scss',
})
export class FilterHotelsComponent {}
