import { Injectable, signal } from '@angular/core';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskServices {
  private readonly STORAGE_KEY = 'tasks';
  private tasksSignal = signal<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    return [
      { id: 1, title: 'Jogar bola', done: false },
      { id: 2, title: 'Lavar louça', done: true },
      { id: 3, title: 'Estudar Angular', done: false },
    ];
  }
}
