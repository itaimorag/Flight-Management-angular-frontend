import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FlightModel } from '../models/flight.model'
import { utilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  private _flights$ = new BehaviorSubject<FlightModel[]>([])
  public flights$ = this._flights$.asObservable()

  private _filteredFlights$ = new BehaviorSubject<FlightModel[]>([])
  public filteredFlights$ = this._filteredFlights$.asObservable()


  private _flightsFilter$ = new BehaviorSubject<string>('')
  public flightsFilter$ = this._flightsFilter$.asObservable()

  public setFilteredFlights() {
    if (!this._flightsFilter$.value) {
      let flights = this._flights$.value

      let filteredFlights = flights.map((flight) =>flight )
      this._filteredFlights$.next([...filteredFlights])
    }
    else {
      let flights = this._flights$.value
      let filteredFlights = flights.filter((flight) => flight.flightNumber.includes(this._flightsFilter$.value.toUpperCase())
        || flight.takeoffAirport.toLowerCase().includes(this._flightsFilter$.value.toLowerCase())
        || flight.landingAirport.toLowerCase().includes(this._flightsFilter$.value.toLowerCase()))
      this._filteredFlights$.next([...filteredFlights])
    }
  }

  public query() {
    this.http.get<any>('//localhost:3030/flights')
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err:', err)
          return throwError(() => err)
        })
      ).subscribe(res => {
        this._flights$.next([...res.flights])
        this.setFilteredFlights()
      })

  }
  public updateFlights(flight: FlightModel) {
    let updatedFlightIdx = this._flights$.value?.findIndex((currFlight) => currFlight?.flightNumber === flight.flightNumber)
    if (updatedFlightIdx && updatedFlightIdx >= 0 && this._flights$.value) {
      let newFlights: FlightModel[] = this._flights$.value
      if (newFlights[updatedFlightIdx].takeoffTime !== flight.takeoffTime ||
        newFlights[updatedFlightIdx].landingTime !== flight.landingTime) {
        //im not deleting the flight.updates after sometime because,
        //  i get new info from the server if this flight changed again so it restarts the updates and
        // that way you can see the table is changing

        // and its called updates so if in the future i'll have some simple other updates i can show them here
        flight.updates = utilService.getTimeDifference(newFlights[updatedFlightIdx].takeoffTime, flight.takeoffTime)
      }
      newFlights[updatedFlightIdx] = { ...flight }
      this._flights$.next([...newFlights])
      this.setFilteredFlights()
    }
  }
  public setFilter(newFilter: string) {
    this._flightsFilter$.next(newFilter)
    this.setFilteredFlights()
  }

}
