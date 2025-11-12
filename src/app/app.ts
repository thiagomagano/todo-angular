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
    if (!confirm('Deseja realmente remover esta tarefa?')) {
      return;
    }

    try {
      const deleted = this.taskService.deleteTask(taskId);
      if (!deleted) {
        alert('Tarefa não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
      alert('Erro ao remover tarefa. Tente novamente.');
    }
  }
}
