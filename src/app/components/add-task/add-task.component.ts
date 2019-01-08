import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  today: Date = new Date;
  category: string;
  description: string;
  date: string;
  hour: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onCategory(event: any) {
    this.category = event.target.value; 
  }
  onDescription(event: any) {
    this.description = event.target.value; 
  }
  onDate(event: any) {
    this.date = moment(event).format("DD-MM-YYYY");
  }
  onHour(event: any) {
    this.hour = event.target.value;
  }

  addTask(): void {

    this.httpClient.post("http://localhost:8080/api/cards",
    {
      cardCategory: this.category,
      eventCardDateTime: this.date+" "+this.hour,
      cardDescription: this.description
    }).subscribe(
        (data: any) => {
          alert("Zadanie zostało dodane!");
        },
        err => {
          alert(err+"Nie udało się dodać zadania");
        }
      )
  }

}
