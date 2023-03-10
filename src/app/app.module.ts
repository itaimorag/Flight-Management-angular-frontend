import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FetchDataPipe } from './pipes/fetch-data.pipe';
import { FlightListComponent } from './cmps/flight-list/flight-list.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { FlightPreviewComponent } from './cmps/flight-preview/flight-preview.component';
import { AppComponent } from './app-root/app-root.component';
import { FlightFilterComponent } from './cmps/flight-filter/flight-filter.component';
import { StopsPipe } from './pipes/stops.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { CeilPipe } from './pipes/ceil.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './cmps/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    AppHeaderComponent,
    FlightPreviewComponent,
    FlightFilterComponent,
    StopsPipe,
    FormatDatePipe,
    FetchDataPipe,
    CeilPipe,
    TableComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
