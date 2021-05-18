import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface UserData {
  memberID: string;
  serialNo: string;
  userID: string;
  displayName: string;
  role: string;
  mail: string;
}


@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.css']
})
export class ViewMembersComponent implements OnInit {



  tableData: UserData[];

  displayedColumns: string[] = ["serailNo", 'displayName', 'role', 'mail', 'action'];
  dataSource: MatTableDataSource<UserData>;
  spin: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router) {
    this.tableData = [];
  }

  ngOnInit(): void {

    this.getMembers();

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

  addMember() {
    this.router.navigate(['channels/members/add'])
  }

  deleteMember(memberID) {
    let channelID = localStorage.getItem("channelID");
    let teamID = localStorage.getItem("teamID");
    let endpoint = 'https://graph.microsoft.com/v1.0/teams/';
    endpoint += teamID;
    endpoint += '/members/';
    endpoint += memberID;
    this.http.delete<any>(endpoint)
      .subscribe(response => {
        alert("Member removed from channel!")
        this.getMembers();
      });
  }

  getMembers() {
    let channelID = localStorage.getItem("channelID");
    let teamID = localStorage.getItem("teamID");
    let endpoint = 'https://graph.microsoft.com/v1.0/teams/'
    endpoint += teamID;
    endpoint += '/channels/';
    endpoint += channelID;
    endpoint += '/members';
    this.http.get<any>(endpoint)
      .subscribe(response => {
        this.tableData = [];
        if (response.value) {
            let users = response.value;
            for (let x in users) {
              let data = {} as UserData;
              data.serialNo = x+1;
              data.memberID = users[x].id;
              data.userID = users[x].userId
              data.role = users[x].roles;
              if (data.role.length == 0) {
                data.role = "member";
              }
              data.mail = users[x].email;
              data.displayName = users[x].displayName;
              this.tableData.push(data);
            }
            this.setTableData(this.tableData);
        }
      });
  }

}
