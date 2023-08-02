import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import Swal from 'sweetalert2';
import { FriendService } from './friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  @Input() friend: Friend

  constructor(private friendService: FriendService) { }

  async deleted(event: Event, id: string, chatID:string) {
    event.stopPropagation();
    await Swal.fire({ /* Pregunta por el nombre actual */
      title: 'Are you sure?',
      showCancelButton: true,
      background: "#323336",
      color: "white",
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
    }).then((res) => {
      if (res.isConfirmed) {
        this.friendService.deleteFriend(id).subscribe(
          res => {
            this.friendService.deleteChatSession(chatID).subscribe(
              res=>{
                Swal.fire({
                  title: 'Amigo eliminado!',
                  icon: 'success',
                  background: "#323336",
                  color: "white",
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 1500,
                }).then(
                  ()=>{
                    location.reload()
                  }
                )
              },(error)=>{
                Swal.fire({
                  title: 'Hubo un error!',
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
          }, (error) => {
            Swal.fire({
              title: 'Hubo un error!',
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

}
