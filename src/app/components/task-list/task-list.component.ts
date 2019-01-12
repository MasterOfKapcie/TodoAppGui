import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  panelOpenState = false;

  category: string;
  description: string;
  good: boolean = false;
  items: any;

  constructor(private httpClient: HttpClient) { }

  getTasks(): void {
    this.httpClient.get(`http://localhost:8080/api/cards`)
      .subscribe(
        (data: any) => {
          this.items = data;
        }
      );
  }

  deleteTask(id: string): void {
    this.httpClient.delete(`http://localhost:8080/api/cards/`+id)
      .subscribe(
        (data: any) => {
          this.getTasks();
        },
        err => {
          alert("Nie udało się usunąć zadania");
        }
      );
  }

  finishTask(id: string): void {
    this.httpClient.delete(`http://localhost:8080/api/card/`+id+`/set-finished`)
      .subscribe(
        (data: any) => {
          this.getTasks();
        },
        err => {
          alert("Nie udało się oznaczyć zadania jako ukończone");
        }
      );
  }

  ngOnInit() {
    this.getTasks();
  }

}
