import { App } from '../../src/app';
import { Todo } from '../../src/todo';


function isArray(obj: any): boolean {
  return obj.constructor.name.toLowerCase() === 'array';
}

function isFunction(obj: any): boolean {
  return typeof obj === typeof Function;
}


const base = 'https://todo-backend-aspnetcore.azurewebsites.net/';

describe('the app', () => {

  it('the heading is Todos', () => {
    expect(new App().heading).toBe('Todos');
  });

  it('must have empty todos array', () => {
    expect(isArray(new App().todos)).toBe(true);
  });

  it('To Create new task(addTodo)', () => {
    const app = new App();
    expect(app.addTodo).toBeDefined();
    expect(isFunction(app.addTodo)).toBeTruthy();
  });

  it('To Remove a Task', () => {
    const app = new App();
    expect(app.removeTodo).toBeDefined();
    expect(isFunction(app.removeTodo)).toBeTruthy();
  });

  it('should resolve into response', () => {
    return fetch(base).then(res => {
      expect(res.statusText).toBe('OK');
      expect(res.status).toBe(200);
    });
  });

  it('should allow setting Accept header', () => {
    let options = {
      headers: {
        'accept': 'application/json'
      }
    };
    fetch(base, options).then(res => res.json()).then(res => {
      expect(res.headers.accept).toBe('application/json');
    });
  });

  it('should allow POST request', () => {
    let options = {
      method: 'POST'
    };
    fetch(base, options).then(res => res.json()).then(res => {
      expect(res.method).toBe('POST');
      expect(res.headers['transfer-encoding']).toBeUndefined;
      expect(res.headers['content-type']).toBeUndefined;
      expect(res.headers['content-length']).toBeGreaterThan(0);
    });
  });

  it('should allow POST request with object body', () => {
    let options = {
      method: 'POST',
      body: { Title: 'Test' }
    };
    fetch(base, options).then(res => res.json()).then(res => {
      expect(res.method).toBe('POST');
      expect(res.body).toBe({ Title: 'Test' });
      expect(res.headers['content-type']).toBe('text/plain;charset=UTF-8');
      expect(res.headers['content-length']).toBeGreaterThan(0);
    });
  });

  it('should accept plain text response', () => {
    fetch(base).then(res => res.json()).then(res => {
      expect(res.headers.get('content-type')).toBe('text/plain');
      return res.text().then(result => {
        expect(res.bodyUsed).toBeTruthy();
        expect(result).toBe('string');
        expect(result).toBe('text');
      });
    });
  });

  it('should accept json response', () => {
    fetch(base).then(res => res.json()).then(res => {
      expect(res.headers.get('content-type')).toBe('application/json');
      return res.json().then(result => {
        expect(res.bodyUsed).toBeTruthy();
        expect(result).toBe('object');
        expect(result).toBe({ name: 'value' });
      });
    });
  });

  it('should allow DELETE request', () => {
    let options = {
      method: 'DELETE'
    };
    fetch(base).then(res => res.json()).then(res => {
      expect(res.method).toBe('DELETE');
    });
  });

  it('should allow DELETE request with string body', () => {
    let options = {
      method: 'DELETE',
      body: { id: 1997130268 }
    };
    fetch(base).then(res => res.json()).then(res => {
      expect(res.method).toBe('DELETE');
      expect(res.body).toBe({ Title: 'Test' });
      expect(res.headers['transfer-encoding']).toBeUndefined;
      expect(res.headers['content-length']).toBeGreaterThan(0);
    });
  });

  it('should allow PATCH request', () => {
    let options = {
      method: 'PATCH',
      body: { "completed" : false }
    };
    fetch(base).then(res => res.json()).then(res => {
      expect(res.method).toBe('PATCH');
      expect(res.body).toBe({ "completed" : false });
    });
  });

  it('get all tasks', () => {
    const app = new App();
    expect(app.GetAllTasks).toBeDefined();
  });

  it('must have updateTask method', () => {
    const app = new App();
    var createdTask = app.UpdateaTask(2035019719);
    expect(app.UpdateaTask).toBeDefined();
    expect(isFunction(app.UpdateaTask)).toBeTruthy();
  });

  it('must have updateTask method and it fails when second parameter is empty object', () => {
    const app = new App();
    try {
      app.UpdateaTask({});
    } catch (e) {
      expect(e.message).toBeDefined();
    }
  });

  it('must have updateTask method and it fails when task with passed id not found', () => {
    const app = new App();
    try {
      app.UpdateaTask({});
    } catch (e) {
      expect(e.message).toBeDefined();
    }
  });

  it('must have DeleteaTask method', () => {
    const app = new App();
    let DeleteaTask = app.DeleteaTask(2014082159);
    expect(app.DeleteaTask).toBeDefined();
    expect(isFunction(app.DeleteaTask)).toBeTruthy();
  });

  it('must be able to delete all completed tasks', () =>{
    const app = new App();
    expect(app.todos.filter(function(todo){
      return !todo.done;
    }));
  });

let target: App;
  beforeEach(() => {
    this.target = new App();
  });
  it("should have an empty Create Task collection", () => {
    expect(this.target.createTask).not.toBeNull();
    expect(this.target.createTask.length).toBe(0);
  });

});  
 
  
