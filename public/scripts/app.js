//JSX javascript extension
console.log("App.js is running");
// var template = <p>This is from app.js</p>;
var template = React.createElement(
    "p",
    null,
    "This is from app.js"
  );
var appRoot = document.getElementById("app");

ReactDOM.render(template, appRoot);