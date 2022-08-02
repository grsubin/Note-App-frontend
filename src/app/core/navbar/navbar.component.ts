import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username = this.authService.userValue['username'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    this.toastr.success('Logged out');
    this.router.navigateByUrl('/login');
  }

  reloadPage(event) {
    event.preventDefault();

    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['user/notes']));
    console.log(this.router.url);
  }
}
