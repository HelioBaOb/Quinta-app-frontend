import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides:SwiperContainer;

  loginUser = {
    email: 'pmonroy13@gmail.com',
    password: '123456'
  }

  registroUser:Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'

  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    // this.slides.allowSlideNext = true;
    // this.slides.allowSlidePrev = true;
    // this.slides.allowTouchMove = true;
    this.usuarioService.crearStorage();

  }

  async login( fLogin: NgForm ){

    if( fLogin.invalid ){ return; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    console.log(valido);
    if( valido ){
      // navegar al tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario y/o contraseña no son correctos.');
    }

  }

  async registro( fRegistro: NgForm ){

    if( fRegistro.invalid ){ return; }
    
    const valido = await this.usuarioService.registro( this.registroUser );

    if( valido ){
      // navegar al tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }

  }

  mostrarRegistro(){
    this.slides.swiper.slideTo(1);
  }

  mostrarLogin(){
    this.slides.swiper.slideTo(0);
  }

}
