import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  logoutUser(){
    localStorage.clear();
  }

}
