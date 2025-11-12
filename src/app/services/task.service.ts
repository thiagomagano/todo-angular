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

  get tasks() {
    return this.tasksSignal.asReadonly();
  }

  private loadTasks(): void {
    try {
      const storedTasks = localStorage.getItem(this.STORAGE_KEY);
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        this.tasksSignal.set(tasks);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      this.tasksSignal.set([]);
    }
  }

  private saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  }

  createTask(text: string): Task {
    const newTask: Task = {
      id: Date.now(),
      title: text.trim(),
      done: false,
    };

    this.tasksSignal.update((tasks) => {
      const updatedTasks = [...tasks, newTask];
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });

    return newTask;
  }

  getAllTasks(): Task[] {
    return this.tasksSignal();
  }
}
