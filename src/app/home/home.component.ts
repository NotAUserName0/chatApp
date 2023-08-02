import { Component, OnInit } from '@angular/core';
import { SocketService } from '../helpers/socket/socket.service';
import { Friend } from '../models/friend.model';
import { HomeService } from './home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDark:boolean = false
  friends:Friend[]
  friend:Friend

  constructor(private socket:SocketService,
    private homeService:HomeService){
    socket.connectSocket()
    this.getUserFriends()
  }

  ngOnInit(){ //al iniciar empiezo a escuchar evento
    this.socket.socket.on("reloadFriendList", ()=>{
      //console.log("cargando lista")
      this.getUserFriends()
    })
  }

  onClick(friend:Friend){
    /* Inicia room */
    this.friend = friend
  }

  getUserFriends(){
    this.homeService.friendList().subscribe(
      res=>{
        //console.log(res)
        this.friends = res
      },(error)=>{
        console.log(error)
      }
    )
  }

  toggleMode() { // FOR DARK MODE
    this.isDark = !this.isDark;
    if(this.isDark){
      document.getElementById("main-content")?.classList.add("dark-mode")
      document.getElementById("nav")?.classList.add("navbar-color")
      document.getElementById("chat")?.classList.add("dark-mode-c")
    }else{
      document.getElementById("main-content")?.classList.remove("dark-mode")
      document.getElementById("nav")?.classList.remove("navbar-color")
      document.getElementById("chat")?.classList.remove("dark-mode-c")
    }
  }

  /* RESPONSIVE */
  openMenu(){
    document.getElementById("main-content").classList.toggle("show")
  }

}
