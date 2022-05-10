import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: string = '';

  constructor( private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
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

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  submit(){
    this.auth.tryRegister(this.form.getRawValue())
    .subscribe(
      res => {
        if(res.status == 200){
          alert('Please check your verification link')
          this.router.navigate(['/'])
        }},
      err => {
        if(err.status == 400){    //this is just a placeholder, this error should never occur as it gets checked by the form, but the server still has to check for invalid data so this error is a possibility
          this.error = 'Invalid form data'
        }
        else if(err.status == 409){
          this.error = 'email address already in use'
        }
        else{
          this.error = 'something went wrong!'
        }
      })
  }
}
