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

  updateTask(id: number, updates: Partial<Task>): Task | null {
    let updatedTask: Task | null = null;

    this.tasksSignal.update((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          updatedTask = { ...task, ...updates };
          return updatedTask;
        }
        return task;
      });

      if (updatedTask) {
        this.saveTasks(updatedTasks);
      }

      return updatedTasks;
    });

    return updatedTask;
  }

  toggleTaskComplete(id: number): Task | null {
    const task = this.tasksSignal().find((t) => t.id === id);
    if (!task) return null;

    return this.updateTask(id, { done: !task.done });
  }

  deleteTask(id: number): boolean {
    let deleted = false;

    this.tasksSignal.update((tasks) => {
      const taskExists = tasks.some((task) => task.id === id);
      if (taskExists) {
        deleted = true;
        const updatedTasks = tasks.filter((task) => task.id !== id);
        this.saveTasks(updatedTasks);
        return updatedTasks;
      }
      return tasks;
    });

    return deleted;
  }

  getAllTasks(): Task[] {
    return this.tasksSignal();
  }
}
