import {Component, OnInit} from '@angular/core';
import {ILink} from '../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  sideMenuContent: ILink[] = [
    {title: 'ULB', type: 'link', route: ['/user/data-upload']},
    {title: 'Links to User Module', type: 'other', route: []},
    {title: 'ULB Profile edit', type: 'link', route: ['/user/profile']}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
