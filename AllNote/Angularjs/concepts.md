# AngularJS Summary
###Terms
----------------------------------------
Template	|	HTML with additional markup
Directives	|	Extends the HTML with custom attributes and elements
Model		|	The data shown to the user in the view and with which the user interacts
Scope		|	A context where the model is stored so that controllers, directives and expressions can access it
Expressions	|	Executes JavaScript code inside brackets {{ }	}.
Compiler	|	Parses the template and instantiates directives and express	ions
Filter		|	Formats the value of an expression for display to the user
View		|	what the user sees (the DOM)
Data 		|	BindingSync data between the model and the view
Controller	|	Maintains the application data and business	 logic
Modulea 	|	container for different parts of an app including contr	ollers, services, filters, directives which configure the Injector
Service		|	Reusable business logic, independent of views
Dependency 	|	InjectionCreates and wires objects and functions
Injector	|	Dependency injection container
-----------------------------------------

##App
ng-app - part of design compiled by angular

##Initializing values in directive
ng-init
``` html
ng-init="greet='Hello World!'; amount= 10000;rateOfInterest = 10.5; duration=10;  myArr = [100, 200]; person = { firstName:'Steve', lastName :'Jobs'}"
```
## AngularJS Directives
----------------------------------------
ng-app		|Auto bootstrap AngularJS application.
ng-init		|Initializes AngularJS variables
ng-model	|Binds HTML control's value to a	property on the $scope object.
ng-controller	|Attaches the controller of MVC to the view.
ng-bind		|Replaces the value of HTML control with the value of specified AngularJS expression.
ng-repeat	|Repeats HTML template once per each item in the specified collection.
ng-show		|Display HTML element based on the value of the specified expression.
ng-readonly	|Makes HTML element read-only based on the value of the specified expression.
ng-disabled	|Sets the disable attribute on the HTML element if specified expression evaluates to true.
ng-if		|Removes or recreates HTML element based on an expression.
ng-click	|Specifies custom behavior when an element is clicked.
----------------------------------------

## AngularJS Modules
A module in AngularJS is a container of the different parts of an application such as controller, service, filters, directives, factories etc. It supports separation of concern using modules.
AngularJS stops polluting global scope by containing AngularJS specific functions in a module.

## Controller
**ng-Controller**
The controller in AngularJS is a JavaScript function that maintains the application data and behavior using $scope object.
You can attach properties and methods to the $scope object inside a controller function, which in turn will add/update the data and attach behaviours to HTML elements. The $scope object is a glue between the controller and HTML
Usage of controllers in html can also be nested

## $Scope
The $scope in an AngularJS is a built-in object, which contains application data and methods. You can create properties to a $scope object inside a controller function and assign a value or function to iterate
Scope has various methods
* $new()		Creates new child scope.
* $watch()	Register a callback to be executed whenever model property changes.
* $watchGroup()	Register a callbackto be executed whenever model properties changes. Here, specify an array of properties to be tracked.
* $watchCollection()	Register a callback to be executed whenever model object or array property changes.
* $digest()	Processes all of the watchers of the current scope and its children.
* $destroy()	Removes the current scope (and all of its children) from the pa	rent scope.
* $eval()		Executes the expression on the current scope and returns the result.
* $apply()	Executes an expression in angular outside the angular framework.
* $on()		Register a callback for an event.
* $emit()		Dispatches the specified event upwards till $rootScope.
* $broadcast()	Dispatches the specified event downwards to all child scopes.

## $rootScope
An AngularJS application has a single $rootScope. All the other $scope objects are child objects.
The properties and methods attached to $rootScope will be available to all the controllers.

Event Binding in AngularJS
AngularJS has various event Directives
* ng-blur
* ng-change
* ng-click
* ng-dblclick
* ng-focus
* ng-keydown
* ng-keyup
* ng-keypress
* ng-mousedown
* ng-mouseenter
* ng-mouseleave
* ng-mousemove
* ng-mouseover
* ng-mouseup

``` html
ng-click example
    <div ng-controller="myController">
        Enter Password: <input type="password" ng-model="password" /> <br />
        <button ng-click="DisplayMessage(password)">Show Password</button
    </div>
To invoke a function on click
<input type='button' value='like' ng-click="IncrementLikes(Arg)">
Function in defined in Javascript as
$scope.IncrementLikes = function(Arg) {
...
}
```

## Repeat
**ng-repeat**
To iterate elements for array -- {can also be nested}
``` html
<li elements in the array> .... <li>
```
	* $index is used for index of element in array
		* {{$index}}
	* parent.$index for index of parent in array
		* {{$parent.$index}}

## Concept of services
AngularJS services are JavaScript functions for specific tasks, which can be reused throughout the application.AngularJS includes services for different purposes. For example, $http service can be used to send an AJAX request to the remote server. AngularJS also allows you to create custom service for your application.

List of services are "http://www.tutorialsteacher.com/angularjs/angularjs-service"

## $http Service
* $http.get()	Perform Http GET request.
* $http.head()	Perform Http HEAD reques		t.
* $http.post()	Perform Http POST request.
* $http.put()	Perform Http PUT request.
* $http.delete()	Perform Http DELETE request.
* $http.jsonp()	Perform Http JSONP request.
* $http.patch()	Perform Http PATCH request.

## $log services
AngularJs includes logging service $log, which logs the messages to the browser's console.
``` javascript
            $log.log('This is log.');
            $log.error('This is error.');
            $log.info('This is info.');
            $log.warn('This is warning.');
            $log.debug('This is debugging.');
```

## $interval Service
The $interval service executes the specified function on every specified milliseconds duration.
Signature: $interval(fn, delay, [count], [invokeApply], [Pass]);

## $window Service
AngularJs includes $window service which refers to the browser window object.
In the JavaScript, window is a global object which includes many built-in methods like alert(), prompt() etc.
The $window service is a wrapper around window object, so that it will be easy to override, remove or mocked for testing. It is recommended to use $window service in AngularJS instead of global window object directly

``` javascript
	    $scope.DisplayAlert = function (message) {
                $window.alert(message);
            }

            $scope.DisplayPrompt = function () {
                var name = $window.prompt('Enter Your Name');
                $window.alert('Hello ' + name);
            }
```

## Filters
They are used to modify display property

filter are applied by writing as {{ parameter | filter }}
``` html
<td> car.name | uppercase </td>
<td> car.mfd  | date:"dd/mm/yyyy" </td>
<td> car.model| lowercase</td>
<td> car.price| number"2 </td>
<td> car.dollr| currency:"$":1</td>
```

* Number		Formats a numeric data as text with comma and fraction.
* Currency	Formats numeric data into specified currency format and fraction.
* Date		Formats date to string in specified format.
* Uppercase	Converts string to upper case.
* Lowercase	Converts string to lower case.
* Filter		Filters an array based on specified criteria and returns new array.
* orderBy		Sorts an array based on specified predicate expression.
* JsonConverts 	JavaScript object into JSON string
* limitTo		Returns new array containing specified number of elements from an existing array.

Binding angular variable to html input
With the ng-model directive you can bind the value of an input field to a variable created in AngularJS

``` html
<select ng-model="sortBy"> 
	<option value="val1"> val1 </option>
</select>

<input type="text" ng-model="Num1" /> x <input type="text" ng-model="Num2" /> 
    = <span>{{Num1 * Num2}}</span>
```


Binding  angular variable with html output
``` html
Hello <label ng-bind="name"></label>

Enter your name: <input type="text" ng-model="name" /><br />
        Hello <span ng-bind="name"></span>

Conditional display of HTML element
ng-if
    <div>
      New: <input ng-if="checked" type="text" />
    </div>
Read only display of HTML element
ng-readonly
    <div>
        Read-only: <input ng-readonly="checked" type="text" value="This is read-only." />
    </div>
Disabled Display of HTML element
ng-disabled
    <div>
        Disabled: <input ng-disabled="checked" type="text" value="This is disabled." />
    </div>

```
Sorting elements while repeat
{{ orderby expression " | orderBy: expression | reverse}}
``` html
<li elements in the array | orderBy: elements.subelement | false> .... <li>
```

## Validation
AngularJS includes the following validation directives.
ng-required	Sets required attribute on an input field.
ng-minlength	Sets minlength attribute on an input field.
ng-maxlength	Sets maxlength attribute on an input field. Setting the attribute to a negative or non-numeric value, allows view values of any length.
ng-pattern	Sets pattern validation error key if the ngModel value does not match the specified RegEx expression.

## State Properties
Angular includes properties which return the state of form and input controls. The state of the form and control changes based on the user's interaction and validation errors. These built-in properties can be accessed using form name or input control name. To check the form status use formName.propertyName, and to check the state of input control, use formName.inputFieldName.propertyName.

* $error		$error object contains all the validation attributes applied to the specified element.
* $pristine	Returns true if the use	r has not interacted with control yet else returns false.
* $valid		Returns true if the model is valid
* $invalid	Returns true if the model is invalid
* $dirty		Returns true if user changed the value of model at least once
* $touched	Returns true if the user has tabbed out from the control.
* $untouched	Returns true if the user has not tabbed out from the control.

## AngularJS Validation CSS Classes
AngularJS includes following CSS classes to allow styling of form and input controls based on the state of form field.
* ng-valid	Angular will set this CSS class if the input field is valid without errors.
* ng-invalid	Angular will set this CSS class if the input does not pass validations.
* ng-pristine	Angular will set this CSS class if a user has not interacted with the control yet.
* ng-dirty	Angular will set this CSS class if the value of form field has been changed.
* ng-touched	Angular will set this CSS class if a user tabbed out from the input control.
* ng-untouched	Angular will set this CSS class if a user has not tabbed out from the input control.
* ng-submitted	Angular will set this CSS class if the form has been submitted.

## AngularJS Routing
We can build Single Page Application (SPA) with AngularJS. It is a web app that loads a single HTML page and dynamically updates that page as the user interacts with the web app.
AngularJS supports SPA using routing module ngRoute. This routing module acts based on the url. When a user requests a specific url, the routing engine captures that url and renders the view based on the defined routing rules.
Example: http://www.tutorialsteacher.com/angularjs/angularjs-routing
