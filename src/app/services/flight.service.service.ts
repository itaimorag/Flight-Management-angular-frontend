import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

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
      //  console.log(`no value `)
      let flights = this._flights$.value

      let filteredFlights = flights.map((flight) =>flight )
      // console.log(`filteredFlights = `, filteredFlights)
      this._filteredFlights$.next(JSON.parse(JSON.stringify(filteredFlights)) )
      if (this._filteredFlights$.value === filteredFlights) console.log(`hi = `)
    }
    else {
      // console.log(`value `)
      let flights = this._flights$.value
      let filteredFlights = flights.filter((flight) => flight.flightNumber.includes(this._flightsFilter$.value.toUpperCase())
        || flight.takeoffAirport.toLowerCase().includes(this._flightsFilter$.value.toLowerCase())
        || flight.landingAirport.toLowerCase().includes(this._flightsFilter$.value.toLowerCase()))
      this._filteredFlights$.next([...filteredFlights])
      if (this._filteredFlights$.value === filteredFlights) console.log(`hi2 = `)
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
        console.log(`res = `, res)
        this._flights$.next([...res.flights])
        this.setFilteredFlights()
      })

  }
  public updateFlights(flight: FlightModel) {
    // let firstValue=this._flights$.value
    let updatedFlightIdx = this._flights$.value?.findIndex((currFlight) => currFlight?.flightNumber === flight.flightNumber)
    // console.log(`updatedFlightIdx = `, updatedFlightIdx)
    if (updatedFlightIdx && updatedFlightIdx >= 0 && this._flights$.value) {
      let newFlights: FlightModel[] = this._flights$.value
      // console.log(`newFlights[updatedFlightIdx] = `, newFlights[updatedFlightIdx],flight)
      if (newFlights[updatedFlightIdx].takeoffTime !== flight.takeoffTime ||
        newFlights[updatedFlightIdx].landingTime !== flight.landingTime) {
        //im not deleting the flight.updates after sometime because,
        //  i get new info from the server if this flight changed again so it restarts the updates and
        // that way you can see the table is changing

        // and its called updates so if in the future i'll have some simple other updates i can show them here

        flight.updates = utilService.getTimeDifference(newFlights[updatedFlightIdx].takeoffTime, flight.takeoffTime)
      }
      newFlights[updatedFlightIdx] = { ...flight }
      // console.log(`newFlights = `, newFlights)
      this._flights$.next(JSON.parse(JSON.stringify(newFlights)))
      this.setFilteredFlights()
    }
  }
  public setFilter(newFilter: string) {
    this._flightsFilter$.next(newFilter)
    this.setFilteredFlights()
  }

}
