import { Component, OnInit } from '@angular/core';
import { LogInPage } from '../../pages/log-in/log-in.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.callLoginModal();
   }
  async callLoginModal() {
    const modal = await this.modalController.create({
      component: LogInPage
    });
    return await modal.present();
  }

}
