import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup
  registerForm: FormGroup
  userError:any = {}
  passwordError:any = {}
  emailError:any = {}

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private cookie:CookieService,
    private route : Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  registerOptions() {
    document.getElementById("separador").classList.toggle("anim")
    document.getElementById("login").classList.toggle("hide")
    document.getElementById("register").classList.toggle("show")
    this.userError.error = false
    this.passwordError.error = false
    const userElement = document.getElementById('user') as HTMLInputElement;
    if (userElement) {
      userElement.value = '';
    }
    const passElement = document.getElementById('password') as HTMLInputElement;
    if (passElement) {
      passElement.value = '';
    }

    const useRElement = document.getElementById('userR') as HTMLInputElement;
    if (useRElement) {
      useRElement.value = '';
    }
    const pasSElement = document.getElementById('passwordR') as HTMLInputElement;
    if (pasSElement) {
      pasSElement.value = '';
    }
    const emailElement = document.getElementById('email') as HTMLInputElement;
    if (emailElement) {
      emailElement.value = '';
    }

  }

  sessionInit() {
    this.userError.error = false
    this.passwordError.error = false

    if(this.loginForm.invalid){
      if(this.loginForm.controls['user'].invalid){
        //console.log("user invalid")
        this.userError.error = true
        this.userError.message = "Rellena este campo o disminuye sus caracteres"
      }
      if(this.loginForm.controls['password'].invalid){
        //console.log("password invalid")
        this.passwordError.error = true
        this.passwordError.message = "Rellena este campo"
      }


    }else{
      //console.log(JSON.stringify(this.loginForm.value))
      this.authService.login(JSON.stringify(this.loginForm.value)).subscribe(
        res => {
          //console.log(res)
          this.cookie.set("token",res.token)
          this.route.navigate(["home"])
        }, (err) => {
          //console.log(err.error.error)
          const errMsg = err.error.error
          if(errMsg === "Usuario inexistente"){
            this.userError.error = true
            this.passwordError.error = false
            this.userError.message = errMsg
          }else if(errMsg === "Wrong password"){
            this.passwordError.error = true
            this.userError.error = false
            this.passwordError.message = errMsg
          }else{
            console.log("Other error: "+errMsg)
          }
        }
      )
    }
  }

  sessionReg() {
    this.userError.error = false
    this.passwordError.error = false
    this.emailError.error = false

    if(this.registerForm.invalid){
      if(this.registerForm.controls['user'].invalid){
        console.log("user invalid")
        this.userError.error = true
        this.userError.message = "Rellena este campo"
      }
      if(this.registerForm.controls['password'].invalid){
        console.log("password invalid")
        this.passwordError.error = true
        this.passwordError.message = "Rellena este campo"
      }
      if(this.registerForm.controls['email'].invalid){
        console.log("email invalid")
        this.emailError.error = true
        this.emailError.message = "Rellena este campo correctamente"
      }
    }else{
      console.log(JSON.stringify(this.registerForm.value))

      this.authService.register(JSON.stringify(this.registerForm.value)).subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'Now login please!!!',
            timer:2500,
            showConfirmButton:false
          })
          this.registerOptions()
        },(error) =>{
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: error.error.error,
            timer:2500,
            showConfirmButton:false
          })
        }
      )


    }

  }

}

