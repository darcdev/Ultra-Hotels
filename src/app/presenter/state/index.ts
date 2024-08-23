import { HotelState } from '@/app/presenter/state/hotels';
import { SearchHotelsFilterState } from '@/app/presenter/state/searchHotelsFilter';
import { RoomState } from '@/app/presenter/state/rooms';

export const stateProviders = [HotelState, SearchHotelsFilterState, RoomState];
