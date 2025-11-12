import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskServices } from './services/task.service';
import { TaskForm } from './components/task-form';
import { TaskList } from './components/task-list';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly pageTitle = signal('todo');
  taskService = inject(TaskServices);

  tasks = this.taskService.tasks;
  tasksDone = computed(() => this.tasks().filter((t) => t.done === true));
}
