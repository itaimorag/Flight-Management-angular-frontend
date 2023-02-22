import { Component,OnInit } from '@angular/core';
import {FlightService} from '../services/flight.service.service'
import { socketService, SOCKET_EVENT_FLIGHT_UPDATE } from '../services/socket.service'
import { from, Observable } from 'rxjs'
import {FlightModel} from '../models/flight.model'

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppComponent implements OnInit {
  flights$!:Observable<FlightModel[]>
  filter$!:Observable<string>
  
  constructor(private flightService: FlightService) {
    this.filter$=this.flightService.flightsFilter$
   }

   ngOnInit() {

     this.flightService.query()
     this.flightService.setFilteredFlights()
     socketService.on(SOCKET_EVENT_FLIGHT_UPDATE, (flight: FlightModel) => {
      this.flightService.updateFlights(flight)
    })
    this.flights$ = this.flightService.filteredFlights$
  }

  setFilter(newFilter:string){
    this.flightService.setFilter(newFilter )
  }

}
