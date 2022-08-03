import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { UserService } from 'src/app/core/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent implements OnInit {
  username = this.authService.userValue.username;
  user: any;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser(this.username);
  }

  getUser(username) {
    return this.userService.findUserByUsername(username).subscribe((data) => {
      this.user = data;
    });
  }
}
