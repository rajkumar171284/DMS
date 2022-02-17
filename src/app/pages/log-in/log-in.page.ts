import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ModalController } from '@ionic/angular';

import { deviceModel } from '../../../model/main.model';
import { ApiRequestService } from '../../api-request.service';
import {newUser} from '../../../model/main.model';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


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
  constructor(private fb:FormBuilder,private router:Router,public modalController: ModalController,
    private api:ApiRequestService,private load:LoadingController,public toastController: ToastController) { 
          
  }

  ngOnInit() {
  }


  logIn(){
    console.log(this.loginForm)
    
    // this.modalController.dismiss()
    
    if(this.loginForm.valid){
     const load=  this.load.create({
        message:'Loggin in..',
        duration: 2000
      })
      
      let params=new newUser();
      params.username=this.loginForm.get('userFormControl').value;
      params.password=this.loginForm.get('passwordFormControl').value;
      console.log(params)
      this.api.userLogin(params).subscribe(res=>{
        console.log(res.includes('Success'))
        if(res.includes('Success')){
          const nav="home/tabs/tab1";
          this.router.navigate([nav]);
        }else{
          console.log(res)
          this.presentToastWithOptions(res)
        }

      })


    }else{
      return;
    }
    
    // const nav="device-list"
    // 
    
  }

  async presentToastWithOptions(res:any) {
    const toast = await this.toastController.create({
      header: 'Login Error',
      message: res,
      position: 'top',
      duration:3000,
      color:'danger'
      // buttons: [
      //   {
      //     side: 'start',
      //     icon: 'star',
      //     text: 'Favorite',
      //     handler: () => {
      //       console.log('Favorite clicked');
      //     },
      //   },
      //   {
      //     text: 'Done',
      //     role: 'cancel',
      //     handler: () => {
      //       console.log('Cancel clicked');
      //     },
      //   },
      // ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
