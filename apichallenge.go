package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/1set/todotxt"
	"github.com/darahayes/go-boom"
	"github.com/julienschmidt/httprouter"
)

// Use this function to output the list of todos.  This function should accept
// query params that allow parameterization of the search
func ListTodos(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	commits := map[string]todotxt.TaskSortByType{
		"SortTaskIDAsc":         1,
		"SortTaskIDDesc":        2,
		"SortTodoTextAsc":       3,
		"SortTodoTextDesc":      4,
		"SortPriorityAsc":       5,
		"SortPriorityDesc":      6,
		"SortCreatedDateAsc":    7,
		"SortCreatedDateDesc":   8,
		"SortCompletedDateAsc":  9,
		"SortCompletedDateDesc": 10,
		"SortDueDateAsc":        11,
		"SortDueDateDesc":       12,
		"SortContextAsc":        13,
		"SortContextDesc":       14,
		"SortProjectAsc":        15,
		"SortProjectDesc":       16,
	}
	todos, e := todotxt.LoadFromPath("todo.txt")
	if e != nil {
		//handle error
		fmt.Print(e)
		boom.Internal(w, e.Error())
		return
	}
	queryValues := r.URL.Query()

	var beforeDue todotxt.TaskList
	var afterDue todotxt.TaskList
	if len(queryValues) != 0 {

		for i, val := range queryValues {
			if i == "projects[]" {
				for _, value := range val {
					filter := todotxt.FilterByProject(value)
					todos = todos.Filter(filter)

				}
			}
			if i == "priority" {
				filter := todotxt.FilterByPriority(val[0])
				todos = todos.Filter(filter)
			}
			if i == "context[]" {
				for _, value := range val {
					filter := todotxt.FilterByContext(value)
					todos = todos.Filter(filter)
				}
			}
			if i == "order[]" {
				var newVal []todotxt.TaskSortByType
				for _, value := range val {
					newVal = append(newVal, commits[value])

				}
				if err := todos.Sort(newVal[0], newVal[1:]...); err != nil {
					log.Fatal(err)
				}
			}
			if i == "duebefore" {
				// date, err := time.Parse(val[0], "2021-02-12T00:00:00-06:00")
				date, err := time.Parse(todotxt.DateLayout, val[0])
				if err != nil {
					panic(err)
				}
				for _, value := range todos {
					if value.HasDueDate() {
						if value.DueDate.Before(date) {
							beforeDue = append(beforeDue, value)
						}
					}
				}
				todos = beforeDue
			}
			if i == "dueafter" {
				date, err := time.Parse(todotxt.DateLayout, val[0])
				if err != nil {
					panic(err)
				}
				for _, value := range todos {
					if value.HasDueDate() {
						if value.DueDate.After(date) {
							afterDue = append(afterDue, value)
						}
					}
				}
				todos = afterDue
			}

		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(todos)

	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(todos)
	}
	// todos = todos.Filter(todotxt.FilterByContext("hiring")).Filter((todotxt.FilterByPriority("A")))
	// // fmt.Println(queryValues)
}

// Use this function to get a specific todo
func GetTodo(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	tdid := ps.ByName("id")
	todo_id, e := strconv.Atoi(tdid)
	if e != nil {
		//If the parameter is not parseable as an integer, there will be an error here.  You probably don't need to worry about this.
	}

	todos, e := todotxt.LoadFromPath("todo.txt")
	if e != nil {
		//If it cannot find the file, there will be an error here. You probably don't need to worry about this.
	}

	task, e := todos.GetTask(todo_id)
	if e != nil {
		//If the task is not found, there will be an error here
		fmt.Println(e.Error())
		//handle error
		boom.NotFound(w, e.Error())
		return
	}
	fmt.Println(task)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(task)

}

func UpdateTodo(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	tdid := ps.ByName("id")
	todo_id, e := strconv.Atoi(tdid)
	if e != nil {
		//If the parameter is not parseable as an integer, there will be an error here.  You probably don't need to worry about this.
	}

	tasks, e := todotxt.LoadFromPath("todo.txt")
	if e != nil {
		//If it cannot find the file, there will be an error here. You probably don't need to worry about this.
	}

	task, e := tasks.GetTask(todo_id)
	if e != nil {
		//If the task is not found, there will be an error here
		//fmt.Println(e.Error())
		//handle error
		boom.NotFound(w, e.Error())
		return
	}

	decoder := json.NewDecoder(r.Body)
	e = decoder.Decode(&task)

	todotxt.WriteToPath(&tasks, "todo.txt")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(task)

}

func CreateTodo(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	todos, _ := todotxt.LoadFromPath("todo.txt")
	// task, _ := todos.GetTask(2)

	task := todotxt.NewTask()
	decoder := json.NewDecoder(r.Body)
	e := decoder.Decode(&task)
	if e != nil {
		boom.BadRequest(w, e.Error())
		return
	}
	todos.AddTask(&task)
	todotxt.WriteToPath(&todos, "todo.txt")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(task)

}

func DeleteTodo(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	tdid := ps.ByName("id")
	todo_id, e := strconv.Atoi(tdid)
	if e != nil {
		//If the parameter is not parseable as an integer, there will be an error here.  You probably don't need to worry about this.
	}
	tasks, e := todotxt.LoadFromPath("todo.txt")
	if e != nil {
		//If it cannot find the file, there will be an error here. You probably don't need to worry about this.
	}
	e = tasks.RemoveTaskByID(todo_id)
	if e != nil {
		//If the task is not found, there will be an error here
		//fmt.Println(e.Error())
		//handle error
		boom.NotFound(w, e.Error())
		return
	}
	todotxt.WriteToPath(&tasks, "todo.txt")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Task Deleted")

}

func main() {

	router := httprouter.New()
	router.GET("/todos", ListTodos)
	router.GET("/todo/:id", GetTodo)
	router.PUT("/todo/:id", UpdateTodo)
	router.DELETE("/todo/:id", DeleteTodo)
	router.POST("/todo", CreateTodo)

	router.NotFound = http.FileServer(http.Dir("./client/build"))
	router.ServeFiles("/edit/:id/*filepath", http.Dir("/js/"))

	log.Fatal(http.ListenAndServe(":8080", router))
}
