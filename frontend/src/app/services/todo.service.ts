import { Injectable ,inject} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import {TodoItem,TodoCreate} from "../models/todo";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private http = inject(HttpClient);
    private baseUrl = '/api/todos';

    getAll(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(`${this.baseUrl}`);
    }

    add(title: string): Observable<TodoItem> {
        const body: TodoCreate = { title };
        return this.http.post<TodoItem>(`${this.baseUrl}`, body);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    setDone(id: number, isDone: boolean) {
        return this.http.patch<void>(`${this.baseUrl}/${id}`, { isDone });
    }
      
      
}