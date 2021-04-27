import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface ChannelData {
  channelID: string;
  teamID: string;
  teamName: string;
  channelName: string;
  description: string;
  createDate: string;
}

@Component({
  selector: 'app-my-channels',
  templateUrl: './my-channels.component.html',
  styleUrls: ['./my-channels.component.css']
})
export class MyChannelsComponent implements OnInit {

  tableData: ChannelData[];

  displayedColumns: string[] = ['teamName', 'channelName', 'description', 'createDate'];
  dataSource: MatTableDataSource<ChannelData>;

  spin: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    this.tableData = [];
  }

  ngOnInit(): void {
    this.getTeams();
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


  getTeams() {
    let endpoint = 'https://graph.microsoft.com/beta/me/joinedTeams';
    this.http.get<any>(endpoint)
      .subscribe(response => {
        if (response.value) {
          let teams = response.value
          for (let x in teams) {
            this.getChannels(teams[x].id, teams[x].displayName);
          }
        }
      });
  }

  getChannels(teamID, teamName) {

    let endpoint = 'https://graph.microsoft.com/v1.0/teams/' + teamID + '/channels';
    this.http.get<any>(endpoint).subscribe(response => {
        if (response.value) {
          let channels = response.value;
          for (let x in channels) {
            let data = {} as ChannelData;
            data.channelID = channels[x].id;
            data.teamID = teamID;
            data.teamName = teamName;
            data.channelName = channels[x].displayName;
            data.description = channels[x].description;
            data.createDate = channels[x].createdDateTime;
            this.tableData.push(data);
          }
          this.setTableData(this.tableData);
        }
      });

  }

}
