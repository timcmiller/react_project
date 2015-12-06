# react_project

React vs. Angular

The first important distinction between Angular and React is that Angular works directly with the browser's DOM, while React creates a virtual DOM and updates the browser's model only when things change.  Additionally, React handles only the view layer, while Angular is a full MVC framework (Model, View, Controller).  This means that React is more compact, thus offering slightly faster performance over the (relatively) bloated Angular framework.

As far as HTML/CSS/JS separation is concerned, both Angular and React share some quirky behavior.  React creates DOM elements from JSX files, which look basically like a mix between JavaScript and HTML/XML syntax, with custom HTML nested within a render method to be called at draw time.  Angular takes an approximately inverse approach - you connect the JS to the HTML by adding specific properties in individual HTML elements ('ng-app', 'ng-controller', etc.) which then connect back to JS files handling the behavior of the app.  

Overall, React is faster than Angular due in part to its smaller size and scope of functionality, but lacks some of the features that the full Angular framework provides.
