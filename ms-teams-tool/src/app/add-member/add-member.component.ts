import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface UserData {
  serialNo: string;
  userID: string;
  displayName: string;
  mail: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {


  tableData: UserData[];

  displayedColumns: string[] = ["serailNo", 'displayName', 'mail', 'action'];
  dataSource: MatTableDataSource<UserData>;
  spin: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router) {
    this.tableData = [];
  }

  ngOnInit(): void {

    this.getUsers();

    this.setTableData(this.tableData);
  }

  setTableData(results): void {
    this.dataSource = null;
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    let endpoint = 'https://graph.microsoft.com/v1.0/users';
    this.http.get<any>(endpoint)
      .subscribe(response => {
        if (response.value) {
          let users = response.value;
          for (let x in users) {
            if (users[x].mail == null) continue;
            let data = {} as UserData;
            data.serialNo = x + 1;
            data.userID = users[x].id;
            data.mail = users[x].mail;
            data.displayName = users[x].displayName;
            this.tableData.push(data);
          }
          this.setTableData(this.tableData);
        }
      });
  }

  addUserToChannel(userID) {
    let channelID = localStorage.getItem("channelID");
    let teamID = localStorage.getItem("teamID");
    let endpoint = 'https://graph.microsoft.com/v1.0/teams/'
    endpoint += teamID;
    endpoint += '/members';
    userID = "https://graph.microsoft.com/v1.0/users/"+userID;
    let postObj = {
      "@odata.type": "#microsoft.graph.aadUserConversationMember",
      roles: [],
      "user@odata.bind": userID
    }
    this.http.post<any>(endpoint, postObj)
      .subscribe(response => {
        if (response) {
          alert("Request to add member is submitted.");
          this.router.navigate(['channels/members'])
        }
      });
  }

}
