import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList = [];
  columnDefs = [
    {headerName: 'Name', field: 'name' },
    {headerName: 'Email', field: 'username' },
    {headerName: 'Mobile', field: 'mobile' },
    {headerName: 'Role', field: 'role'},
    {headerName: 'Joined On', field: 'createdAt', filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        var date = new Date(parseInt(params.value));
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getUTCFullYear();
      }
    },
    {headerName: 'Is Active', field: 'isActive' },
    {headerName: 'Is Deleted', field: 'isDeleted' },
  ];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers({}).subscribe(res => {
      if(res['success']){
        this.userList = res['data'];
      } else{
        alert('Failed');
      }
    })
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
