import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'tasks',
    pathMatch: 'full',
  },
  {
    path: 'add-task',
    component: AddTaskComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
