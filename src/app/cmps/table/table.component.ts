import {Input, Component, ViewChild, OnChanges, SimpleChanges  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FlightModel } from 'src/app/models/flight.model';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @Input() flights!:FlightModel[]|null
  dataSource: TableDataSource|undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['flightNumber', 'status', 'takeoffTime', 'landingTime', 'takeoffAirport', 'landingAirport', 'updates'];

  ngOnChanges(changes: SimpleChanges) {
    if ('flights' in changes) {
      this.dataSource = new TableDataSource();
    this.dataSource.data=this.flights!
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    }
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
  getBackgroundColor(updates:string|null){
    if(updates) return  'rgba(255, 255, 0, 0.321)';
    return  'white'
  }
}
