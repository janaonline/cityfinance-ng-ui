import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  @Output() onQuestionUpdate: EventEmitter<any> = new EventEmitter();
  @Input() question;
  @Input() latitudeLabel = 'Latitude';
  @Input() longitudesLabel = 'Longitudes';
  @Input() disabled: boolean;

  latLong: string = '0,0';

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.latLong = this.question?.modelValue || '0,0';
  }

  openDialog() {
    
    this.dialog.open(MapDialogComponent, {
      width: "auto",
      height: "auto",
      data: {
        latitude: this.latitude,
        longitude: this.longitude
      }
    })
    .afterClosed().subscribe((result) => {
      if(result) {
        this.latLong = result;
        this.onQuestionUpdate.emit({ target: {value: this.latLong} });
      }
    });
  }

  onLatChange({ target: { value }}) {
    this.latLong =  `${value},${this.longitude}`;
    this.onQuestionUpdate.emit({ target: {value: this.latLong} });
  }
  onLongChange({ target: { value }}) {
    this.latLong =  `${this.latitude},${value}`;
    this.onQuestionUpdate.emit({ target: {value: this.latLong} });
  }

  get latitude() {
    const [lat, _] = (this.latLong || ',')?.split(',');
    return +lat ;
  }
  get longitude() {
    const [_, long] = (this.latLong || ',')?.split(',');
    return +long;
  }
}
