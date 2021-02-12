# Fullstack API Developer Code Challenge

As an alternative, you can implement a web interface (instead of a commandline interface). This should be a REST interface to the [todotxt](https://github.com/1set/todotxt) library.

## Setup - Running apichallenge.go

The basic framework has been done for you. The file `apichallenge.go` implements a basic server that can handle the web connection for you (you don't need to implement authentication or user management for this task). To run this setup you will need to:

1. Install `todotxt`: `go get github.com/1set/todotxt`
1. Install `httprouter`: `go get github.com/julienschmidt/httprouter`
1. Compile: `go build`
1. Run it! : `./apichallenge`

Now if you navigate to `http://localhost:8080/mainpage.html` you should see the main page.

## Integration

You will see that the basic REST routes have been implemented for you. All you need to do is modify the relevant functions to satisfy the tasks below.

## Static Assets

`apichallenge.go` will serve up any file that is stored in the `static/` folder as a direct path. For example, navigating to `http://localhost:8080/mainpage.html` serves the `mainpage.html` file. Navigating to `http://localhost:8080/stylesheets/main.css` serves the main stylesheet. ETC. You can put any html or css or javascript libraries you need for the interface in the `static` folder.

## todo.txt

The application will load tasks from and save tasks into the provided `todo.txt` file. You do not need to integrate with any kind of database. Just using this file for storage is OK.

## Tasks

Be sure that you are familiar with the [todo.txt file format](http://todotxt.org/) before starting this task. Don't worry, it's easy to learn!

Your web application should support the following actions:

1. List all the tasks. This part of the project should accept query parameters to filter the list of todos. **The filtering must be done on the backend.** The point of this part of the task is to demonstrate that you can use an existing Go codebase. So, you **must** implement the list filters on the backend in Go (and not on the frontend in Javascript)!!! The following query parameters should be accepted:
   1. `projects` - Any projects included here should filter the output to include _only_ those tasks that are associated with one or more of the given projects.
   1. `priority` - Any priorities included here should filter the output to include _only_ those tasks that have one of the priorities in question
   1. `context` - Any contexts included here should filter the output to include _only_ those tasks that have one of the contexts in question
   1. `order` - If the order param is set, the tasks should come back in the order specified. You should support all the orders given in the [TaskSortByType](https://pkg.go.dev/github.com/1set/todotxt#TaskSortByType)) struct.
   1. `duebefore` - this should accept a string representing a datetime and _only_ return tasks that (a) have a duedate (b) which is before the date specified
   1. `dueafter` - this should accept a string representing a datetime and _only_ return tasks that (a) have a dueate (b) which is after the date specified
1. Accept input from a user and add a new todo to the list
1. Update any aspect of a task. This includes:
   1. Adding (or removing) a project
   1. Adding (or removing) a context
   1. Setting (or changing) the priority
   1. Setting (or changing) the duedate
1. Mark a task as complete
1. (Optional) Delete a task
