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
  taskService = inject(TaskServices);

  taskTitle = signal('');
  tasksDone = computed(() => this.tasks().filter((t) => t.done === true));

  tasks = this.taskService.tasks;

  addTask() {
    const text = this.taskTitle().trim();

    if (!text) return;

    try {
      this.taskService.createTask(text);
      this.taskTitle.set('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      alert('Erro ao adicionar tarefa. Tente novamente.');
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  toggleTask(taskId: number) {
    try {
      this.taskService.toggleTaskComplete(taskId);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa. Tente novamente.');
    }
  }

  removeTask(taskId: number) {
    //this.tasks.update((task) => task.filter((t) => t.id !== taskId));
  }
}
