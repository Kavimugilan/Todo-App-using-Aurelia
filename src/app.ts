import { Todo } from './todo';

export class App {

  heading = "Todos";;
  todos: Todo[] = [];
  todoDescription = '';
  id;
  completed;

  constructor() {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      this.todos = items;
    }
    this.GetAllTasks();
  }

  addTodo() {
    if (this.todoDescription) {
      this.todos.push(new Todo(this.todoDescription, this.id, this.completed));
      this.todoDescription = '';
      this.SaveToLocalStorage();
    }
  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.SaveToLocalStorage();
    this.DeleteaTask(todo);
  }

  clearCompleted() {
    this.todos = this.todos.filter(function (todo) {
      return !todo.done;
    });
    this.SaveToLocalStorage();
  }

  SaveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.todos));
    this.todos.filter(function (todo) {
    });
  }

createTask() {
    this.todos.forEach(function (task) {
      let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
      fetch(url, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ order: "", title: task.description }),
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    });
  }

  GetAllTasks() {
    let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => { console.error('Error:', error) })
      .then(response => {
       // console.log('Success:', response);
        for (let i = 0; i < response.length; i++) {
          this.todos.push(new Todo(response[i].title, response[i].id, response[i].completed));
        }
      });
  }

  DeleteAllTask() {
    let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
    fetch(url, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      console.log('Success:', response);
      this.todos = this.todos.filter(function (todo) {
        return !todo.description;
      });
    });
  }

  GetTasks() {
    let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => { console.error('Error:', error) })
      .then(response => {
        console.log('Success:', response);
        const index = [];
        for (let x in response) {
          index.push(x);
        }
        index.sort(function (a, b) {
          return a == b ? 0 : (a > b ? 1 : -1);
        });
        let indextask = response[index[0]];
        this.todos.push(new Todo(indextask.title, indextask.id, indextask.completed));
      });
  }

  DeleteaTask(todo) {
    const id = todo.id;
    let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
    fetch(url + id, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      console.log('Success:', response);
    });
  }

  UpdateaTask(todo) {
    let id = todo.id;
    let url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
    fetch(url + id, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ order: "", title: todo.description, completed: todo.done }),
    }).then(response => console.log('Success:', response));
    this.SaveToLocalStorage();
  }

}

