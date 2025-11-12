import { Component, signal } from '@angular/core';
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
  protected readonly title = signal('todo');
  taskTitle = signal('');

  tasks = signal<Task[]>(this.getTarefas());

  adicionarTarefa() {
    const title = this.taskTitle().trim();

    if (title) {
      const newTask: Task = {
        id: Date.now(),
        title,
        done: false,
      };
      this.tasks.update((t) => (t = [...t, newTask]));
      this.taskTitle.set('');
    }
  }

  getTarefas(): Task[] {
    //chamada API
    return [
      { id: 1, title: 'Jogar bola', done: false },
      { id: 2, title: 'Lavar louça', done: false },
      { id: 3, title: 'Estudar Angular', done: false },
    ];
  }
}
