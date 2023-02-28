import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  @Input() list: any[];
  @Input() selector: string = 'id';
  @Input() displayName: string = 'name';

  dropdownControl = new FormControl();
  searchControl = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    this.searchControl.setValue('');
  }

  filteredList = this.searchControl.valueChanges.pipe(
    // debounceTime(300),
    distinctUntilChanged(),
    map((searchTerm: string) => {
      if (!searchTerm) {
        return this.list;
      }
      return this.list.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    })
  );

  selectItem(item: any) {
    this.dropdownControl.setValue(item);
  }

}
