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
  recipient: string = "";
  text: string;

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

  onMail(event: any) {
    this.recipient = event.target.value; 
  }

  sendMail(task: any): void {

    this.httpClient.post("http://localhost:8080/api/mail",
    {
      recipient: this.recipient,
      text: "Przypomnienie o zadaniu do wykonania!\nKategoria: "+task.cardCategory+"\nTermin: "+task.eventCardDateTime+"\nOpis: "+task.cardDescription
    }).subscribe(
        (data: any) => {
          alert("Alert wysłano!");
        },
        err => {
          alert("Nie udało się wysłać alertu");
        }
      )
  }

  ngOnInit() {
    this.getTasks();
  }

}
