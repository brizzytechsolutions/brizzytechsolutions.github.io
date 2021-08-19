import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './models/user';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: any = [];
  profileImage: string = "";
  selectedIconId: string = "";
  selectedIconObject: any = {id: "", icon: "", title: "", value: ""};
  socialIcons: any = [
    {id: "name", icon: "face", title: "Hi, My name is", value: ""},
    {id: "email", icon: "email", title: "My email address is", value: ""},
    {id: "birthday", icon: "today", title: "My birthday is", value: ""},
    {id: "address", icon: "my_location", title: "My address is", value: ""},
    {id: "phone", icon: "phone", title: "My phone number is", value: ""},
    {id: "password", icon: "lock", title: "My password is", value: ""},
  ];

  constructor(private uService: UserServiceService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    try {
      this.uService.getUsers().subscribe(res => {
        this.users = res;
        console.log('this.User', this.users);

        this.profileImage = this.users['results'][0]['picture']['large'];
        this.socialIcons[0]['value'] = `${this.users['results'][0]['name']['first']} ${this.users['results'][0]['name']['last']}`;
        this.socialIcons[1]['value'] = this.users['results'][0]['email'];
        this.socialIcons[2]['value'] = this.users['results'][0]['dob']['date'];
        this.socialIcons[3]['value'] = `${this.users['results'][0]['location']['street']['number']} ${this.users['results'][0]['location']['street']['name']}`;
        this.socialIcons[4]['value'] = this.users['results'][0]['cell'];
        this.socialIcons[5]['value'] = this.users['results'][0]['login']['password'];

        this.selectedIconObject = this.socialIcons[0];
      })
    } catch (error) {
      console.log('Failed to load users', error);
    }
  }

  onHover(obj:any){
    this.selectedIconId = obj['id'];
    this.selectedIconObject = obj;
  }
}
