import { Component } from '@angular/core';
import { ChatService } from './chat.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[ChatService]
})
export class AppComponent {

    user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];
    mydata: any=[];
    mediaText: any;
    fileExtension: any;
    fileExtension1: any;
    constructor(private _chatService:ChatService){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
            .subscribe(data => {
                // console.log(data);
                // var fileName;
                // console.log(data.message.match(/\.(jpeg|jpg|png|gif)/g) != null);
                var abc = data.message.match(/\.(jpeg|jpg|png|gif)/g) != null
                var abcd = data.message.match(/\.(mp4)/g) != null

                if (abc == true)
                {
                    this.fileExtension = data.message;
                    console.log(this.fileExtension)
                }
                else if (abcd == true)
                {
                    this.fileExtension1 = data.message;
                    console.log(this.fileExtension1)
                    }
                       console.log(this.fileExtension,this.fileExtension1)
                // fileName = data.message;
                // console.log(fileName)
                // this.fileExtension = fileName.replace(/^.*\./, '');
                // console.log(this.fileExtension);
                this.messageArray.push(data)
                console.log(this.messageArray)
            });
    }

    join(){
        this._chatService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

    sendMessage()
    {
        if (this.messageText) {
            this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
        }
        else 
        {
            this._chatService.sendMessage({ user: this.user, room: this.room, message: this.mediaText });
            
            }
    }
    onSelectFile(event) {
        const files = event.target.files;
        if (files) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    if (file.type.indexOf("image") > -1) {
                        this.mydata.push({
                            url: e.target.result,
                            type: 'img'
                        });
                    } else if (file.type.indexOf("video") > -1) {
                        this.mydata.push({
                            url: e.target.result,
                            type: 'video'
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }
    ngOnDestroy() {
        this.leave();
    }
}