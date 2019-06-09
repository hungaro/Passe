import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  cadastroForm: FormGroup;
  habilitar: Boolean = false;
  usuario: Usuario;
  btnCadastrar: Boolean = false;
  btnLogar: Boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public facebook: Facebook,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(){
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  register(){
    this.authService.register(this.credentialsForm.value).subscribe(
      res => {
        this.authService.login(this.credentialsForm.value).subscribe();

      }
    );
  }

  loginFacebook() {
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then((response) => {
     let params = new Array<string>();



     this.facebook.api("/me?fields=name,email", params)
     .then(res => {

         //estou usando o model para criar os usuarios
         let usuario = new Usuario();
         usuario.nome = res.name;
         usuario.email = res.email;
         usuario.senha = res.id;
         usuario.login = res.email;



         this.logar();
     }, (error) => {
       alert(error);
       console.log('ERRO LOGIN: ',error);
     })
   }, (error) => {
     alert(error);
   });
 }

 logar() {
   debugger
  this.spinner.show();
  this.authService.login(this.credentialsForm.value).subscribe(
    res => {
      debugger
      this.spinner.hide();
      this.router.navigate(['inside']);
    },
    error => {
      this.spinner.hide();
      alert('Login falhou!')
    }
  );
 }

 logout(){
  this.facebook.logout();
  console.log('deslogou')
 }

 voltar(){
  this.habilitar=false;
  this.btnCadastrar=false;
  this.btnLogar=false
 }
}

export class Model {

  constructor(objeto?) {
      Object.assign(this, objeto);
  }

 }

export class Usuario extends Model {
    codigo: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
}

