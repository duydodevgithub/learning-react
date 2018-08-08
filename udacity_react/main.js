//library code

function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }

function createStore(reducer) {
    // The store function should have four parts
    //1. The state
    //2. Get the state
    //3. Listen to change on the state
    //4. Update the state
    let state;
    let listeners = [];

    const getState = () => state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

//app code
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO: 
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => (todo.id !== action.id));
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;
    }
}

function app(state = [], action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app);
// console.log(store);
store.subscribe(() => {
    // console.log("The new state is: ", store.getState());

    $("#todos").html("");
    $("#goals").html("");

    const {todos, goals} = store.getState();
    todos.forEach(addTodoToDOM);
    goals.forEach(addGoalToDOM);
})


// const unsubscribe = store.subscribe(() => {
//     console.log("The store changed.");
// })

// store.dispatch(addTodoAction({
//     id: 0,
//     name: 'Learn Redux',
//     complete: false
// }))


function addTodo() {
    const name = $("#todo").val();
    // console.log(name);
    $("#todo").val("");
    store.dispatch(addTodoAction({
        name,
        complete: false,
        id: generateId()
    }))
}

function addGoal() {
    const name = $("#goal").val();
    $("#goal").val("");
    store.dispatch(addGoalAction({
        name,
        id: generateId()
    }))
}

$("#todoBtn").on("click", function(){
    addTodo();
});

$("#goalBtn").on("click", function() {
    addGoal();
})

//add todo and goal to DOM

function addTodoToDOM(todos) {
    $("#todos").append("<li>" + todos.name + "</li>");
    $("li").css("textDecoration", todos.complete ? "line-through" : "none");
    $("li").on("click", function() {
        store.dispatch(toggleTodoAction(todos.id));
    })
}

function addGoalToDOM(goals) {
    $("#goals").append("<li>" + goals.name + "</li>");
}