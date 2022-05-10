import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserstoreService } from 'src/app/stores/userstore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  error: string

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private fb: FormBuilder, private userstore : UserstoreService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  submit(){
    this.auth.tryLogin(this.form.getRawValue()).subscribe( 
      res => {
        let user = {
          id: '',
          name: res.body.name,
          email: res.body.email,
          isWirt: res.body.isWirt,
          isAdmin: res.body.isAdmin,
          password: this.form.getRawValue().password,
          restaurants: undefined
        }
        this.userstore.updateUser(user)
        this.userstore.setIsLoggedIn(true)
        this.router.navigate(['/home'])
      },
      err => {
        if(err.status == 403){
          this.error = "wrong username/password"
        }
        else{
          this.error = "something went wrong"
        }
      }
    )
  }
}
