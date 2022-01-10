import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  constructor() { }

  balData = [
    {type: 'pdf', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},
    {type: 'excel', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},
    {type: 'pdf', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},
    {type: 'excel', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},
    {type: 'pdf', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},
    {type: 'pdf', documentName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl commodo aliquet.',   updatedOn: 'October 24, 2020'},

  ]
  allSelected = false;
  unSelect = false;
  selectedUsersList =[];
  ngOnInit(): void {
  }


  isAllSelected(All:boolean = false) {
    if(All){
      const numSelected = this.selectedUsersList.length;
      const numRows = this.balData.length;
      return numSelected === numRows;
    }else{
      return !!this.selectedUsersList.length;
    }
  }
  async masterToggle() {
    if(this.isAllSelected(true)){
      for await (const user of this.balData) {
        user[`isSelected`] = false;
      }
      this.selectedUsersList = [];
    }else{
      this.selectedUsersList = [];
      this.balData.forEach(row => {
        this.selectedUsersList.push(row)
        row[`isSelected`] = true;
      });
    }
    console.log(this.selectedUsersList);
  }

  toggleRowSelection(event,row){
    if(row.isSelected){
      let index = this.selectedUsersList.findIndex(el => el._id == row._id);
      console.log(index);
      if(index > -1)
      this.selectedUsersList.splice(index,1);
      row.isSelected = false;
    }else{
      this.selectedUsersList.push(row);
      row.isSelected = true;
    }
    console.log(this.selectedUsersList);
  }
}



