import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading =false;

  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {






    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });



  }

  get f() {return this.loginForm.controls;}

  onSubmit(){

    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        
        this.toastr.success(" ", "Welcome"+ data['username']);
        const returnUrl = this.route.snapshot.queryParams['returnUrl' || '/'];
        this.router.navigateByUrl(returnUrl);
      },
      error: res => {
        console.log(res)
        this.toastr.error(" ", res.error?.message);
        this.loading = false;
      }
    });

    
  }
}
