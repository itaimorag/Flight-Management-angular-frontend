import { Component, EventEmitter, Input,Output,OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service.service';


@Component({
  selector: 'flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss']
})
export class FlightFilterComponent implements OnInit{
  @Input() filter!:string|null|undefined
  @Output() setFilter= new EventEmitter<string>()
  
  constructor() {
   }
   ngOnInit(){

   }

onSetFilter(){
this.setFilter.emit(this.filter!)
}


}

