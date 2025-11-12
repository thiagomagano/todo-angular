import { Component, inject } from '@angular/core';
import { TaskServices } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  standalone: true,
  template: `
    <fieldset role="checkbox">
      <legend>TO-DO</legend>

      @for (task of tasks(); track task.id) {
        <label>
          <input type="checkbox" [checked]="task.done" (change)="toggleTask(task.id)" />
          <span> {{ task.title }} </span>
          <button class="delete-button" (click)="removeTask(task.id)" title="Remover tarefa">
            🗑️
          </button>
        </label>
      } @empty {
        <p>Não existem tarefas</p>
      }
    </fieldset>
  `,
  styles: `
    input[type='checkbox']:checked + span {
      text-decoration: line-through;
      color: #888;
      opacity: 0.6;
    }
    span {
      transition: all 0.3s ease;
    }
    .delete-button {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      opacity: 0.5;
    }

    .delete-button:hover {
      opacity: 1;
      background: #ffebee;
      transform: scale(1.1);
    }
  `,
})
export class TaskList {
  private taskService = inject(TaskServices);

  tasks = this.taskService.tasks;

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
