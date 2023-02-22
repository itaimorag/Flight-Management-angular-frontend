import { Component, Input,OnInit } from '@angular/core';
import { FlightModel } from 'src/app/models/flight.model';


@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
@Input() flights!:FlightModel[]|null


ngOnInit(){
console.log(`flights = `, this.flights)
}
trackByFlightId(index: number, flight: FlightModel): string {
  return flight.flightNumber;
}
}
