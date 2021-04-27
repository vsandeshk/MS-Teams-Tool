import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface ChannelReq {
  "template@odata.bind": string;
  displayName: string;
  description: string;
  channels: any;
}

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  spin: boolean;
  formGroup: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.spin = false;
    this.initForm();
  }

initForm() {
  this.formGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
}

resetFields() {
  this.spin = false;
  this.formGroup.reset();
}

createChannel() {
  if (this.formGroup.valid) {
    this.spin = true;
    let reqObj = {} as ChannelReq;

    reqObj.displayName = this.formGroup.value.displayName;
    reqObj.description = this.formGroup.value.description;
    reqObj["template@odata.bind"] = "https://graph.microsoft.com/v1.0/teamsTemplates('standard')";
    reqObj.channels = [];
    reqObj.channels.push(this.formGroup.value)

    let endpoint = 'https://graph.microsoft.com/v1.0/teams';
    console.log(reqObj);

    this.http.post<any>(endpoint, reqObj).subscribe(response => {

      alert("Request Submitted to MS Teams. Please verify in 'My Channels' after few minutes.");

      this.resetFields();

    },
      error => {
        alert(error.message);
      });

  }
}

}
