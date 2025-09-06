import { Component, signal,inject,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl,Validators,FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { TodoItem } from './models/todo';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private svc = inject(TodoService);
 
  items = signal<TodoItem[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  titleCtrl = new FormControl('',{nonNullable:true,validators:[Validators.required,Validators.pattern(/\S+/)]});

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
     next: (items) => {
      this.items.set(items); 
      this.loading.set(false);
     },

     error: () => {
      this.error.set("Failed to load Todo items");
      this.loading.set(false);
     }

     });
  }
  addItem() {
    if(this.titleCtrl.invalid) return;
    const title = this.titleCtrl.value.trim();
    if(title.length === 0|| !title) return;

    this.loading.set(true);
    this.svc.add(title).subscribe({
      next: (item) => {
        const current = this.items()??[];
        this.items.set([...current, item]);
        this.titleCtrl.reset('');
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to add Todo item");
        this.loading.set(false);
      }
    });

  }

  deleteItem(id: number) {
    this.loading.set(true);
    this.svc.delete(id).subscribe({
      next: () => {
       const current = this.items()??[];
       this.items.set(current.filter(item => item.id !== id));
       this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to delete Todo item");
        this.loading.set(false);
      }
    });
  }

  toggleDone(item: TodoItem) {
    const target = !item.isDone;
    this.svc.setDone(item.id, target).subscribe({
      next: () => {
        const current = (this.items() ?? []).map(x => x.id === item.id ? { ...x, isDone: target } : x);
        this.items.set(this.sort(current)); // move completed items to bottom
      },
     error: () => { this.error.set('Failed to update item.'); }
   });
  }
  
  private sort(list: TodoItem[]): TodoItem[] {
    return [...list].sort((a, b) => (
      Number(a.isDone) - Number(b.isDone)) || 
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) || 
      (a.id - b.id) ); 
  }

  trackById = (_: number, t: TodoItem) => t.id;
     
  }

  

  