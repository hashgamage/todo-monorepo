import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { TodoService } from './services/todo.service';
import { of, throwError } from 'rxjs';
import { TodoItem } from './models/todo';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let comp: App;
  let svcSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    svcSpy = jasmine.createSpyObj<TodoService>('TodoService', ['getAll', 'add', 'delete', 'setDone']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: TodoService, useValue: svcSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    comp = fixture.componentInstance;
  });

  it('loads list on init', () => {
    const data: TodoItem[] = [
      { id: 1, title: 'A', isDone: false, createdAt: new Date().toISOString() }
    ];
    svcSpy.getAll.and.returnValue(of(data));
    comp.ngOnInit();
    expect(svcSpy.getAll).toHaveBeenCalled();
  });

  it('add() appends item and sorts', () => {
    svcSpy.getAll.and.returnValue(of([]));
    comp.ngOnInit();

    const created: TodoItem = { id: 2, title: 'New', isDone: false, createdAt: new Date().toISOString() };
    svcSpy.add.and.returnValue(of(created));

    comp.titleCtrl.setValue('New');
    comp.addItem();

    expect(svcSpy.add).toHaveBeenCalledWith('New');
  });

  it('toggleDone() updates item state and re-sorts', () => {
    const list: TodoItem[] = [
      { id: 1, title: 'A', isDone: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'B', isDone: false, createdAt: new Date().toISOString() }
    ];
    svcSpy.getAll.and.returnValue(of(list));
    comp.ngOnInit();

    svcSpy.setDone.and.returnValue(of(void 0));
    comp.toggleDone(list[0]);

    expect(svcSpy.setDone).toHaveBeenCalledWith(1, true);
  });

  it('delete() removes item from list', () => {
    const list: TodoItem[] = [
      { id: 1, title: 'X', isDone: false, createdAt: new Date().toISOString() }
    ];
    svcSpy.getAll.and.returnValue(of(list));
    comp.ngOnInit();

    svcSpy.delete.and.returnValue(of(void 0));
    comp.deleteItem(1);

    expect(svcSpy.delete).toHaveBeenCalledWith(1);
  });

  it('shows error when load fails', () => {
    svcSpy.getAll.and.returnValue(throwError(() => new Error('boom')));
    comp.ngOnInit();
    expect(comp.error()).toBeTruthy();
  });
});
