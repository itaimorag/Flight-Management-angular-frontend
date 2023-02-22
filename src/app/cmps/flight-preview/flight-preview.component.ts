import { Component,Input } from '@angular/core';
import { FlightModel } from 'src/app/models/flight.model';

@Component({
  selector: 'flight-preview',
  templateUrl: './flight-preview.component.html',
  styleUrls: ['./flight-preview.component.scss']
})
export class FlightPreviewComponent {
  @Input() flight!:FlightModel
}
