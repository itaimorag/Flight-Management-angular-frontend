import { Component,ChangeDetectionStrategy, Input } from '@angular/core';
import { FlightModel } from 'src/app/models/flight.model';
@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent  {
@Input() flights!:FlightModel[]|null


trackByFlightId(index: number, flight: FlightModel): string {
  return flight.flightNumber;
}
getColor(status:string) {
  switch (status) {
    case 'hangar':
        return 'blue';
    
    case 'airborne':
      return 'green';
       
    case 'malfunction':
      return 'red';
        
    default:
      return 'red';
}
}
}
