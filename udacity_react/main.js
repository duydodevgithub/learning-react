//library code

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

function todos(state = [], action) {
    if(action.type === "ADD_TODO") {
        return state.concat([action.todo]);
    }

    return state;
}


const store = createStore();
console.log(store);
store.subscribe(() => {
    console.log("The new state is: ", store.getState());
})


const unsubscribe = store.subscribe(() => {
    console.log("The store changed.");
})
