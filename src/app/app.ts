import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo');
  task = '';

  //tasks = signal(['Fazer compras', 'Aprender Angular', 'Jogar Bola']);
  tasks = signal(this.getTarefas());

  adicionarTarefa(event: MouseEvent) {
    event.preventDefault();
    //this.tasks.set([...this.tasks(), this.task]);
    this.tasks.update((t) => (t = [...t, this.task]));
  }

  getTarefas(): string[] {
    //chamada API
    return ['Jogar Bola', 'Lavar a Louça', 'Aprender Angular'];
  }
}
