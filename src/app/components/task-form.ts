import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskServices } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  template: `
    <fieldset role="group">
      <input
        type="text"
        [value]="taskTitle()"
        (input)="taskTitle.set($any($event.target).value)"
        (keypress)="onEnter($event)"
        placeholder="Digite uma nova tarefa..."
        class="task-input"
      />
      <button (click)="addTask()" [disabled]="!taskTitle().trim()">Adicionar</button>
    </fieldset>
  `,
  styles: ``,
})
export class TaskForm {
  private taskService = inject(TaskServices);
  taskTitle = signal('');

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
}
