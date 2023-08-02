import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { ChatService } from './chat.service';
import { Chat, Message } from 'src/app/models/chat.model';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';
import { SocketService } from 'src/app/helpers/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges{

  //componentes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() friend:Friend
  chat: Message[]
  chatInfo:Chat
  user:String

  constructor(private chatService:ChatService,
    private cookie:CookieService,
    private socket:SocketService){
      this.socket.socket.on('messageUpdated', ()=>{
        console.log("actualizando")
        this.getChatInfo()
      })
    }

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  ngAfterViewInit() {
    this.scrollToBottom();
    this.notEnterText()
    this.getUserInfo()
  }

  scrollToBottom() {
    setTimeout(() => {
      const lastIndex = this.chat?.length - 1;
      this.viewport.scrollToIndex(lastIndex, 'smooth');
    }, 0);
  }

  entrada(textareaRef: HTMLTextAreaElement,chatID:String){
    console.log("text:"+textareaRef.value)
    console.log("chatID:"+chatID)
    this.chatService.newMessage(chatID,textareaRef.value).subscribe(
      res=>{
        console.log(res)
        this.socket.emit('sendMessage',this.chatInfo.name)
      },(error)=>{
        console.log(error)
      }
    ).closed
    textareaRef.value=''
  }

  notEnterText(){
    document.getElementById("msg").onkeypress = function(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    };
  }

  /* DARK MODE */
  @Input() isDark:boolean;

  ngOnChanges(changes: SimpleChanges){
    if(changes['isDark']){
      //console.log(changes)
      if(this.isDark){
        document.getElementById("message-box")?.classList.add("dark-mode")
        document.getElementById("msg")?.classList.add("dark-mode-ta")
      }else{
        document.getElementById("message-box")?.classList.remove("dark-mode")
        document.getElementById("msg")?.classList.remove("dark-mode-ta")
      }
    }

    if(changes['friend']){
      this.socket.emit('leaveRoom',this.chatInfo?.name)
      console.log("inicia chat")
      this.getChatInfo()
    }
  }


  /* Consultas */
  getChatInfo(){
    this.chatService.getChat(this.friend.chatID).subscribe(
      res=>{
        this.chat=res.messages
        this.chatInfo=res
        this.socket.emit('joinRoom',this.chatInfo.name)
        this.scrollToBottom();
        //console.log(this.chat)
      },(error)=>{
        console.log(error)
      }
    ).closed

  }

  getUserInfo(){
    const token = this.cookie.get("token");
    const decodedToken = jwt_decode(token);
    //console.log(decodedToken['claims']['user'])
    this.user = decodedToken['claims']['user']
  }

}
