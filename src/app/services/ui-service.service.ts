import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController,
              private toastCtrl: ToastController) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 1500
    });
    console.log('toast');
    toast.present();
  }

}
