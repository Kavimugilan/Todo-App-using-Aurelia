define('app',["require", "exports", "./todo"], function (require, exports, todo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.heading = "Todos";
            this.todos = [];
            this.todoDescription = '';
            var items = JSON.parse(localStorage.getItem('items'));
            if (items) {
                this.todos = items;
            }
            this.GetAllTasks();
        }
        ;
        App.prototype.addTodo = function () {
            if (this.todoDescription) {
                this.todos.push(new todo_1.Todo(this.todoDescription, this.id, this.completed));
                this.todoDescription = '';
                this.SaveToLocalStorage();
            }
        };
        App.prototype.removeTodo = function (todo) {
            var index = this.todos.indexOf(todo);
            if (index !== -1) {
                this.todos.splice(index, 1);
            }
            this.SaveToLocalStorage();
            this.DeleteaTask(todo);
        };
        App.prototype.clearCompleted = function () {
            this.todos = this.todos.filter(function (todo) {
                return !todo.done;
            });
            this.SaveToLocalStorage();
        };
        App.prototype.SaveToLocalStorage = function () {
            localStorage.setItem('items', JSON.stringify(this.todos));
            this.todos.filter(function (todo) {
            });
        };
        App.prototype.createTask = function () {
            this.todos.forEach(function (task) {
                var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
                fetch(url, {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ order: "", title: task.description }),
                }).then(function (res) { return res.json(); })
                    .catch(function (error) { return console.error('Error:', error); })
                    .then(function (response) { return console.log('Success:', response); });
            });
        };
        App.prototype.GetAllTasks = function () {
            var _this = this;
            var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (res) { return res.json(); })
                .catch(function (error) { console.error('Error:', error); })
                .then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    _this.todos.push(new todo_1.Todo(response[i].title, response[i].id, response[i].completed));
                }
            });
        };
        App.prototype.DeleteAllTask = function () {
            var _this = this;
            var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
            fetch(url, {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                console.log('Success:', response);
                _this.todos = _this.todos.filter(function (todo) {
                    return !todo.description;
                });
            });
        };
        App.prototype.GetTasks = function () {
            var _this = this;
            var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (res) { return res.json(); })
                .catch(function (error) { console.error('Error:', error); })
                .then(function (response) {
                console.log('Success:', response);
                var index = [];
                for (var x in response) {
                    index.push(x);
                }
                index.sort(function (a, b) {
                    return a == b ? 0 : (a > b ? 1 : -1);
                });
                var indextask = response[index[0]];
                _this.todos.push(new todo_1.Todo(indextask.title, indextask.id, indextask.completed));
            });
        };
        App.prototype.DeleteaTask = function (todo) {
            var id = todo.id;
            var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
            fetch(url + id, {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                console.log('Success:', response);
            });
        };
        App.prototype.UpdateaTask = function (todo) {
            var id = todo.id;
            var url = 'https://todo-backend-aspnetcore.azurewebsites.net/';
            fetch(url + id, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ order: "", title: todo.description, completed: todo.done }),
            }).then(function (response) { return console.log('Success:', response); });
            this.SaveToLocalStorage();
        };
        return App;
    }());
    exports.App = App;
});



define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});



define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});



define('todo',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Todo = (function () {
        function Todo(description, id, completed) {
            this.description = description;
            this.id = id;
            this.completed = completed;
            this.done = false;
        }
        return Todo;
    }());
    exports.Todo = Todo;
});



define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});



define('web',["require", "exports", "./todo", "./app"], function (require, exports, todo_1, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Web = (function () {
        function Web() {
        }
        Web.prototype.addTodo = function () {
            var app = new app_1.App();
            if (app.todoDescription) {
                app.todos.push(new todo_1.Todo(app.todoDescription, app.id, app.completed));
                app.todoDescription = '';
                app.SaveToLocalStorage();
            }
        };
        return Web;
    }());
    exports.Web = Web;
});



define('text!style.css', ['module'], function(module) { module.exports = "ul{\r\n    list-style-type: none;\r\n}\r\n\r\n.clearCompleted:hover\r\n{\r\n    color:red;\r\n    text-decoration: underline;\r\n    cursor: pointer;\r\n}"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${heading}</h1><form submit.trigger=\"addTodo()\"><input type=\"text\" value.bind=\"todoDescription\"></form><ul><li repeat.for=\"todo of todos\"><input type=\"checkbox\" checked.bind=\"todo.done\" change.trigger=\"UpdateaTask(todo)\"> <span contenteditable=\"true\" css=\"text-decoration: ${todo.done ? 'line-through' : 'none'}\"> ${todo.description} </span><button click.trigger=\"removeTodo(todo)\">Remove</button></li></ul><div><span class=\"count\"> ${todos.length} Items Left</span> <span class=\"clearCompleted\" click.trigger=\"clearCompleted()\">Clear Completed</span></div><div><button click.trigger=\"createTask()\">Create Task</button> <button click.trigger=\"DeleteAllTask()\">DeleteAllTask</button> <button click.trigger=\"GetTasks()\">Get Tasks</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map
