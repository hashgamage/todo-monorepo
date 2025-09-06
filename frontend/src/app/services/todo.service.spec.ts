import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let svc: TodoService;
  let httpMock: HttpTestingController;
  const base = environment.apiBaseUrl ? `${environment.apiBaseUrl}/api/todos` : '/api/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    svc = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll should GET /api/todos', () => {
    svc.getAll().subscribe();
    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });


  it('add should POST /api/todos with title', () => {
    svc.add('Hello').subscribe();
    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'Hello' });
    req.flush({ id: 1, title: 'Hello', isDone: false, createdAt: new Date().toISOString() });
  });


  it('delete should DELETE /api/todos/:id', () => {
    svc.delete(7).subscribe();
    const req = httpMock.expectOne(`${base}/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('setDone should PATCH /api/todos/:id with isDone', () => {
    svc.setDone(3, true).subscribe();
    const req = httpMock.expectOne(`${base}/3`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isDone: true });
    req.flush(null);
  });
});
