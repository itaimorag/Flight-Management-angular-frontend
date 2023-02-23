import { Component,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import {FlightService} from '../services/flight.service.service'
import { socketService, SOCKET_EVENT_FLIGHT_UPDATE } from '../services/socket.service'
import { from, Observable } from 'rxjs'
import {FlightModel} from '../models/flight.model'

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppComponent implements OnInit,OnChanges {
  flights$!:Observable<FlightModel[]>
  flights!:FlightModel[]
  filter$!:Observable<string>
  
  constructor(private flightService: FlightService) {
    this.filter$=this.flightService.flightsFilter$
   }

   ngOnInit() {

     this.flightService.query()
     this.flightService.setFilteredFlights()
     socketService.on(SOCKET_EVENT_FLIGHT_UPDATE, (flight: FlightModel) => {
      this.flightService.updateFlights(flight)
      // this.flights$ = this.flightService.filteredFlights$
    })
    this.flightService.filteredFlights$.subscribe(flights => {
      // console.log(`foo = `,flights)
      // this.flights=flights.filter(flight=>flight)
      this.flights =JSON.parse(JSON.stringify(flights)) 
    })
    this.flights$ = this.flightService.filteredFlights$
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('flights' in changes) {
      console.log(`foo = `)
    }
  }
  setFilter(newFilter:string){
    this.flightService.setFilter(newFilter )
  }

}
