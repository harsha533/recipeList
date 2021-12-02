import { Component, OnInit } from '@angular/core';
import { RecipeDataStorageService } from 'src/app/shared/recipe-data-storage.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private dataService: RecipeDataStorageService,
    private authService: LoginService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((userResponse) => {
      console.log(userResponse);
      
      if (userResponse) {
        this.isAuthenticated = true;
      }
      else {
        this.isAuthenticated = false;
      }
    })
  }

  saveData() {
    this.dataService.storeData();
  }

  fetchData() {
    this.dataService.fetchData().subscribe();
  }

  logout() {
    console.log('log out');
    
    this.authService.logout();
  }
}
