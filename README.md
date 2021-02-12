# Fullstack API Developer Code Challenge

## Instructions for running the application

## Note: The build folder on the frontend has been included for convenience

1. `cd client && npm install && npm run build`
   To install frontend requirements and to build the client

2. `cd ..`

3. To install `boom` : `go get github.com/darahayes/go-boom`
   Install `todotxt`: `go get github.com/1set/todotxt`
   Install `httprouter`: `go get github.com/julienschmidt/httprouter`

4. To compile: `go build`

5. To execute: `./Todo-App`

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
