import { Component, Input,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { FlightModel } from 'src/app/models/flight.model';


@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit,OnChanges {
@Input() flights!:FlightModel[]|null


ngOnInit(){
console.log(`flights = `, this.flights)
}
ngOnChanges(changes: SimpleChanges) {
  if ('flights' in changes) {
    console.log(`foo = `)
  }
}
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
