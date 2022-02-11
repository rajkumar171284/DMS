import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ModalController } from '@ionic/angular';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  providers:[FormBuilder]
})
export class LogInPage implements OnInit {
  userFormControl = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6)]));
  passwordFormControl = new FormControl('', [Validators.required]);

  loginForm= this.fb.group({
    userFormControl: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
    passwordFormControl :['', [Validators.required]]
  
  })
  matcher = new MyErrorStateMatcher();
  constructor(private fb:FormBuilder,private router:Router,public modalController: ModalController) { }

  ngOnInit() {
  }


  logIn(){
    console.log(this.matcher)
    this.modalController.dismiss()
    const nav="home/tabs/tab1";
    // const nav="device-list"
    this.router.navigate([nav]);
    
  }
}
