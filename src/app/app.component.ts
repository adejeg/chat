import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ChatService } from "./services/chat.service";
import { CrudService } from "./services/crud.service";
import { first, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('popup', {static: false}) popup: any;

  public roomId: string;
  public messageText: string;
  public messageArray: any;

  public showScreen = false;
  public u_id: string;
  public currentUser;
  public selectedUser;
  public userList: any;

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService,
    private crud: CrudService
    ) {
    }

    ngOnInit(): void {
      this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        if (this.messageArray?.length > 0) {
          this.messageArray.push(data);
        }else{
          this.messageArray = [data]
        }
      });
  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  login(dismiss: any): void {

    this.crud.getData(`user?u_id=${this.u_id}`).subscribe(
      (res: any) => {
        this.currentUser = res;
        this.getRooms();
        dismiss();
      }
      )
    }

    getRooms(){
      this.crud.getData(`roomsByUserId?user_id=${this.currentUser?._id}`).subscribe(
          (res: any) => {
          res.forEach(element => {
            element.user = element.users.find((i: any) => i?._id !== this.currentUser?._id)
          });
          console.log(res);

          this.userList = res
          if (this.currentUser) {
            this.showScreen = true;
          }
      }
    )
  }

  selectUserHandler(room: any): void {
    this.selectedUser = room
    this.roomId = room?.roomId;
    this.getMessages();

    this.join(this.currentUser.first_name, this.roomId);
  }

  getMessages(){
    this.crud.getData(`messageByRoomId?roomId=${this.roomId}`).pipe(first()).subscribe(
      (res: any) => this.messageArray = res
    )
  }
  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {

    this.crud.postData('message', {
      sender: this.currentUser.u_id,
      room: this.roomId,
      message: this.messageText
    }).subscribe(
      (res: any) => this.chatService.sendMessage(res)
    )

    this.messageText = '';
  }
}
