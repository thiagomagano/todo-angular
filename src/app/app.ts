import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  taskTitle = signal('');
  tasksDone = computed(() => this.tasks().filter((t) => t.done === true));

  tasks = signal<Task[]>(this.getTarefas());

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

  getTarefas(): Task[] {
    //simulando chamada API
    return [
      { id: 1, title: 'Jogar bola', done: false },
      { id: 2, title: 'Lavar louça', done: true },
      { id: 3, title: 'Estudar Angular', done: false },
    ];
  }
}
