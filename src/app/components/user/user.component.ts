import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { SocketService } from 'src/app/helpers/socket/socket.service';
import { User } from 'src/app/models/user.model';
import { Common } from 'src/app/helpers/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  mainUser: User //= {user:"", email:"", status:""}

  constructor(private cookie: CookieService,
    private userService: UserService,
    private socket: SocketService,
    private token: Common) {
    this.getUserInfo()
  }

  @HostListener('window:blur') /* MANEJA EL CONTROL DE FOCUS DE LA VENTANA */
  onWindowBlur() {
    this.mainUser.status = 'away';
    this.userService.changeStatus("away").subscribe(
      res => {
        //console.log(res)
      }
    ).closed
  }

  @HostListener('window:focus')
  onWindowFocus() {
    this.mainUser.status = 'online';
    this.userService.changeStatus("online").subscribe(
      res => {
        //console.log(res)
      }
    ).closed
  }

  displayMenu() {
    document.getElementById("menu")?.classList.toggle("active")
  }

  async edit() {
    await Swal.fire({ /* Pregunta por el nombre actual */
      title: 'Enter your new name',
      input: 'text',
      inputLabel: 'Your user name: ' + this.mainUser.user,
      inputValue: "",
      showCancelButton: true,
      background: "#323336",
      color: "white",
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      inputValidator: (value) => {
        if (!value || value.length > 15) {
          return 'You need to write something or length is overpassed!'
        }
        return null;
      }
    }).then( /* Si encuentra un valor */

      async (result) => {
        if (result.isConfirmed) { /* Si da en cambiar */
          await Swal.fire({ /* Le pregunta si esta seguro */
            title: 'Are you sure?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            background: "#323336",
            color: "white",
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
          }).then((conf) => { /* Si esta seguro procede a llamar al servicio */
            if (conf.isConfirmed) {
              /* Este ultimo swal se deberia activar unicamente si se hace correctamente el service */
              this.userService.editName(result.value).subscribe(
                res => {
                  this.cookie.set("token",res.token)
                  Swal.fire({
                    title: 'User change',
                    icon: 'success',
                    background: "#323336",
                    color: "white",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                  }).finally(
                    () =>{
                      location.reload()
                    }
                  )
                }, (error) => {
                  console.log(error)
                }
              )
            }
          })
        }
      })
  }

  async add() {
    await Swal.fire({ /* Pregunta por el nombre actual */
      title: 'Enter user name',
      input: 'text',
      inputValue: "",
      showCancelButton: true,
      background: "#323336",
      color: "white",
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        return null;
      }
    }).then((res) => { /* Si esta seguro procede a llamar al servicio */
      if (res.isConfirmed) {
        /* Este ultimo swal se deberia activar unicamente si se hace correctamente el service */
        this.userService.addFriend(res.value).subscribe(
          res=>{
            Swal.fire({
              title: 'Amigo agregado!',
              icon: 'success',
              text:res.message,
              background: "#323336",
              color: "white",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500,
            })
          },(error)=>{
            console.log(error)
            Swal.fire({
              title: 'No se pudo agregar!',
              icon: 'error',
              text: error.error.error,
              background: "#323336",
              color: "white",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        )

      }
    })
  }

  logout() {
    this.userService.changeStatus("offline").subscribe(
      res => {
        this.cookie.delete("token")
        this.socket.connectSocket()
        location.reload()
      }, (error) => {
        console.log(error)
      }
    )
  }

  getUserInfo() {
    let claims = this.token.getClaims()
    this.mainUser = { user: claims['user'], email: claims['email'], status: claims['status'] }
    //console.log(claims)
  }

  /* DARK MODE */
  @Input() isDark: boolean;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDark']) {
      if (this.isDark) {
        document.getElementById("user-info")?.classList.add("dark-mode")
      } else {
        document.getElementById("user-info")?.classList.remove("dark-mode")
      }
    }
  }
}
