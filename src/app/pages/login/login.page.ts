import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides:SwiperContainer;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = "3.5";

  loginUser = {
    email: 'pmonroy13@gmail.com',
    password: '123456'
  }

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    // this.slides.allowSlideNext = true;
    // this.slides.allowSlidePrev = true;
    // this.slides.allowTouchMove = true;

  }

  login( fLogin: NgForm ){

    if( fLogin.invalid ){ return; }

    this.usuarioService.login( this.loginUser.email, this.loginUser.password );

  }

  registro( fRegistro: NgForm ){
    console.log(fRegistro.valid); 
  }

  seleccionarAvatar( avatar:any ){
    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;
  }

  mostrarRegistro(){
    this.slides.swiper.slideTo(1);
  }

  mostrarLogin(){
    this.slides.swiper.slideTo(0);
  }

}
