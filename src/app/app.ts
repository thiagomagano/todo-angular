import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskServices } from './services/task.service';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly pageTitle = signal('todo');
  tasksService = inject(TaskServices);

  taskTitle = signal('');
  tasksDone = computed(() => this.tasks().filter((t) => t.done === true));

  tasks = signal<Task[]>(this.tasksService.loadTasks());

  addTask() {
    const title = this.taskTitle().trim();

    if (title) {
      const newTask: Task = {
        id: Date.now(),
        title,
        done: false,
      };
      this.tasks.update((t) => [...t, newTask]);
      this.taskTitle.set('');
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  toggleTask(task: Task) {
    this.tasks.update((currentTasks) =>
      currentTasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
    );
  }
  removeTask(taskId: number) {
    this.tasks.update((task) => task.filter((t) => t.id !== taskId));
  }
}
