// function createStore() {
//     // The store function should have four parts
//     //1. The state
//     //2. Get the state
//     //3. Listen to change on the state
//     //4. Update the state
//     let state;
//     let listeners = [];

//     const getState = () => state;
//     const subscribe = (listener) => {
//         listeners.push(listener);
//         return () => {
//             listeners = listeners.filter((l) => l !== listener);
//         }
//     }
//     return {
//         getState,
//         subscribe
//     }

// }

// const store = createStore();
// store.subscribe(() => {
//     console.log("The new state is: ", store.getState());
// })

// const unsubscribe = store.subscribe(() => {
//     console.log("The store changed.");
// })