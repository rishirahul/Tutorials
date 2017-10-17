# Modules

* app module -> main module
* can be broken into further smaller module

# components

reusable

##  files

  * <name>.component.ts -- component def
      * has ts class of with <name> starting capital
          * export reusable class  
          * import component from @angular/core 
          * define component decorator
              * selector to reference component in html
              * html template path or template itself
              * css / scss template or template itself
      * add this component to module in declaration
          * import this class into module
      * add selector to required html
  ### xx.component.ts
``` javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
  ### xx.component.html
  * <name>.component.html
      * template if using file
``` html
<p>
  course works!
</p>

```
  ### xx.component.css
  * <name>.component.css
      * css if using file
  * <name>.component.spec.ts
      * unit test
## generate file using command line 
    ng g c <name>
## Component API
### Input (input as state of comp) and Output (as event to other component)
  * Input 
      * @Input() isFavorite: boolean in favorite component is marked as input
      * <favorite [isFavorite]="valFromParentComp"></favorite>
      * aliasing input variable
          * @Input(fav-alias) isFavorite: boolean in favorite component is marked as input
          * <favorite [fav-alias]="valFromParentComp"></favorite>
### Output 
  * @Output() eventName = new EventEmitter - def event in comp which is marked as input
  * emit event on action e.g.
      onClick() {
          this.eventName.emit(this.isFav); // this.isFav is event type
      } 
  <favorite (eventName)="funInParentCompToCall($event)"></favorite>
  * similarly as input alias in also attached here
### Shadow DOM idea
  * bubbling effect on styles to parent styles
  * encapsulation: view.encapsulation.Emulated to stop this effect in angular:w
### Providing custom component with component selector
  * ng-content can be used to this
      .select="tag"
  * 2nd last lecture of components



# Binding
## data-binding 
* field in DOM can be updated by variable in component 
  RR_11   src/app/courses/course.component.ts
    export class CoursesComponent implements OnInit {  //RR_1 RR_2
      title = "List of courses";
      courses;
      viewMode = 'map';
      getTitle () {                      //RR_11
        return this.title;
      };

<h2 *ngIf="courses.length > 0; then coursesList else noCourses"> </h2>
<ng-template #coursesList>
    {{getTitle()}}
</ng-template>
<ng-template #noCourses>
    No Courses in List
</ng-template>
## Property Binding
* using {{ val }} in html template
* This is one way -- comp to DOM
```
    <img src="{{ imageUrl }}" />
    <img [src]="imageUrl" />
    <h2>{{ title }}</h2>
    <h2 [textcontent]="title"></h2>
```
## attribute Binding
```
    <table><tr><td [attr.colspan="prop]><table><tr><td> 
```
## Class binding
```
    <button class="btn btn-primary" [class.active]="isActive()"> BUTTON </button>
```
## Style binding
```
    <button [style.backgroundColor = "isActive() ? blue  : white"> BUTTON </button>
```
## Event binding
    <button (click)="onSave($event)"></button>
* Event bubbling
    *  to stop event bubbling
         * onSave($event) { $event.stopPropagation(); ...}
## Two way binding
* component to DOM and vice versa
* import FormsModule in app.module.ts
* <input [(ngModel)]="email">

# Template variable
    <input #email (keyup.enter)="onKeyUp(email.value)" />
value of input is stored in template variable #email
# Pipes
    {{ course.title | uppercase}} 
    {{ course.student | number }}
    {{ course.date | shortDate }}
    {{ course.price | currency:'AUD':true:'3.2-2' }}
    {{ course.rating | number: '2.1-1'}} 
    pipes can also be custom defined



#    Directive
*    to manipulae DOM e.g. ngFor, ngIf..                                 RR_13   src/app/courses/course.component.ts
*    a "*" is used before directive6
## Types of directive:
### Structural
* **ngIf**
    * [hidden] alternative to ngIf, {more mem in large tree}
* **ngSwitchCase**
    * mapView vs List View in course content
```
    <div [ngSwitch]="feildInClass">
        <div *ngSwitchCase="'map'">
        <div *ngSwitchDefault>
````
### Attribute
* ***ngFor***
    * has many other properties also like index, even, etc    RR_13   src/app/courses/course.component.ts
    see doc for more info
    * ***Auto change detection:***
        * Angular automatically detects change in object used in ngFor
        * changes DOM dynamically
                    
# Service 
*    used to implement logic side 
*    <name>.service.ts -- naming convention
*    create a class with implentation logici                    RR_14  src/courses-service.service.ts 
*    dependency-injection
*    providing dependency of a class into its constructor       RR_15   src/app/courses/course.component.ts
*    add service into providers in module def                   RR_16  src/app.module.ts
 ### src/courses-service.service.ts
``` javascript
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesServiceService {    //RR_14

  getCourses() {
    return ["Math", "Bio", "chemistry", "Physics"];
  }
  constructor() { }

}
```
 ### src/app/courses/course.component.ts
``` javascript
  constructor(service: CoursesServiceService) {     //RR_15 
    this.courses = service.getCourses();
  }

```
 ### src/app.module.ts
``` javascript
providers: [CoursesServiceService,..]

```
### auto generate service
        ng g s <name>


# Install Bootstrap 
* npm install bootstrap
* in global styles.css add relative path
        bootstrap/dist/css/bootstrap.css
                
                @import "~bootstrap/dist/css/bootstrap.css"
    

# Template driven form 
## add FormsModule to imports in app.modules.ts 
## creation of two way from using ngModel
```
<form>
    <div class="form-group">
        <label for="name"> Name 
          <input 
            ngModel id="contactName" 
            name ="contactName"
            #contactName="ngModel"   // reading data of ngModel to variable
            type="text" 
            (change)="printContactName(contactName)" // passing var to another fun
            class="form-control">
    </label>
    </div>
    ...
</form>
```
## Adding validation
* contact name should be required
* initially error shouldn't be there
* minimum and maximum length
* apply red border by adding attribute to css class
* ngForm to add whole for validation and submit function
  * Coupled with (OnSubmit) called when form is submitted
  * validity of whole form is sum of form-group
* model-group can also used to used to valid set of form-group whole is validated by form
* enabling button only when form is valid
* adding checkbox
* adding dropdown list
* adding radio button
#### template file 
```html
<form #f="ngForm" (ngSubmit)="submit(f)">
    <div ngModelGroup="contact" #contact="ngModelGroup">
    <div class="form-group">
        <label for="name"> Name 
          <input 
            ngModel name="contactName" id="contactName" 
            #contactName="ngModel" 
            type="text" 
            (change)="printContactName(contactName)" 
            class="form-control"
            required minlength="3" maxlength="20">
            <div class="alert alert-danger" *ngIf="contactName.touched && contactName.errors"> 
                <div *ngIf="contactName.errors.required"> Name required </div>
                <div *ngIf="contactName.errors.minlength"> more than {{contactName.errors.minlength.requiredLength}} char </div>
                <div *ngIf="contactName.errors.maxlength"> less than 20 char </div>

            </div>
        </label>
    </div>
    </div>
    <div class="form-group">
        <label for="contact">Contact
          <textarea name="contact" id="contact" cols="30" rows="10"></textarea></label>
    </div>
    <div class="checkbox">
        <label><input type="checkbox" ngModel name="isSubscribed" ></label>
    </div>
    <div class="form-group">
        <label for="contactMethods"></label>
        <select name="contactMethods" ngModel id="contactMethods">
        <option value=""></option>    
        <option *ngFor="let method of contactMethods" [value]="method.id">{{method.name}}</option>    
        </select>
    </div>
    <div *ngFor="let method of contactMethods" class="radio">
        <label>
            <input ngModel type="radio" name="contactMethod" [value]="method.id" > {{ method.name }}</label>
        </div>
    <button class="btn btn-primary" [disabled]="!f.valid">Submit</button>

</form>
```
#### x.component.ts file 
``` javascript
export class ContactFormComponent implements OnInit {

  contactMethods=[
    {id: 1, name: 'email'},
    {id: 2, name: 'phone'},
  ];
  printContactName(val) {
    console.log(val);
  }
  submit(f) {
    console.log(f);
  }
}
```

# Reactive forms
* Add ReactiveFormsModule to module group
* Import formGroup and formControl in component
* define new formGroup and formControl control inside formGroup
* Add formGroup and formControl in template html
* Import validator in component and add state and validator to formControl
* Multiple validators can be added by adding array of validators

#### xx.template.html
``` html 
<form [formGroup]="form">
  <div class="form-group">
    <label for="username"> Name
    </label>
      <input type="text"
             formControlName="username"
             id="username"
             class="form-control">
      <div class="alert alert.danger" *ngIf="username.touched && username.invalid">
        <div *ngIf="username.errors.required">Name is required</div>
        <div *ngIf="username.errors.minlength">Name should be min {{ username.errors.minlength.requiredLength }} </div>
      </div>
  </div>
  <div class="form-group">
    <label for="password"> password
    </label>
      <input type="text"
             formControlName="password"
             id="password"
             class="form-control">
      <div class="alert alert.danger" *ngIf="password.touched && password.invalid">Password is required</div>
  </div>
  <button class="btn btn-primary" type="submit">Signup</button>
</form>
```
#### xx.component.ts
``` javascript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  constructor() { }

  ngOnInit() {
  }

}

```

### Implementing custom validation functions
* Add new file to implement validator functions
* shape of validator function is 
```javascript
interface ValidatorFn {
  AbstractControl:ValidationErrors|null
}
```
* Export a class containing validator function
* define a static function so that creation of instance is not required
* implement in component.ts
* also implement html message if error is true in template html
* if validator function is **Async** return should be promise or observables of validation errors
  * create new promise with functions resolve and reject as parameters
  * display message / image while async op is in progess using *formContolName.pending*
* ngSubmit can be used to validate the form upon submit
  * on ngSubmit call a function

#### xx.template.html
``` html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="alert alert-danger" *ngIf=""forms.error> cannot create username </div>
  <div class="form-group">
    <label for="username"> Name
    </label>
      <input type="text"
             formControlName="username"
             id="username"
             class="form-control">
      <div *ngIf="username.pending"> waiting for name uniqueness </div>
      <div class="alert alert.danger" *ngIf="username.touched && username.invalid">
        <div *ngIf="username.errors.required">Name is required</div>
        <div *ngIf="username.errors.minlength">Name should be min {{ username.errors.minlength.requiredLength }} </div>
        <div *ngIf="username.errors.cannotContainSpace">space is not supported</div>
        <div *ngIf="username.errors.shouldBeUnique">name is already taken</div>
      </div>
  </div>
  <div class="form-group">
    <label for="password"> password
    </label>
      <input type="text"
             formControlName="password"
             id="password"
             class="form-control">
      <div class="alert alert.danger" *ngIf="password.touched && password.invalid">Password is required</div>
  </div>
  <button class="btn btn-primary" type="submit" [disabled]="!form.valid">Signup</button>
</form>
```
#### xx.component.ts
``` javascript
  import { UsernameValidators } from './username.validators';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
  })
  export class SignupFormComponent implements OnInit {
    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), UsernameValidators.cannotContainSpace],
          UsernameValidators.shouldBeUnique),
      password: new FormControl('', Validators.required)
    });

    get username() {
      return this.form.get('username');
    }
    get password() {
      return this.form.get('password');
    }

    onSubmit() {
      this.form.setErrors({invalidLogin: false});
    }

    constructor() { }

    ngOnInit() {
    }

  }

```
#### validator function.ts
``` javascript
import { setTimeout } from 'timers';
import { resolve } from 'url';
import { AbstractControl, ValidationErrors } from '@angular/forms';
export class UsernameValidators {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
  static shouldBeUnique (control: AbstractControl) : Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {                  // to make function Async (just to simulate the behavior)
        if (control.value === 'rishi') {
          resolve({ shouldBeUnique: true });
        }
        else {
          resolve(null);
        }
      }, 2000);
    });
  }
} 
```

## creating array of objects in form
* use formArray inside form group to create such objects
* read html input and pass it to create new form control 
  * push this new form control to form array
* read form array and display this event
#### xx.template.html
``` html
<form>
  <input type="text" class="form-control"
  (keyup.enter)="addTopic(topic)" #topic>
  <ul class="list-group">
    <li class="list-group-item"
    *ngFor="let topic of form.get('topics').controls"
    (click)="removeTopic(topic)" >
    {{topic.value}}
    </li>
  </ul>
</form>

```
#### xx.component.js
``` javascript
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent implements OnInit {
  form = new FormGroup({
    topics: new FormArray([])
  });
  addTopic(topic:HTMLInputElement) {
    (this.form.get('topics') as FormArray).push(new FormControl(topic.value));
    topic.value='';
  }
  removeTopic(topic: FormControl) {
    let index = (this.form.get('topics') as FormArray).controls.indexOf(topic);
    (this.form.get('topics') as FormArray).removeAt(index);
  }
  constructor() { }

  ngOnInit() {
  }

}

```
## Consuming HTTP services
* import http module
* add http:Http to constructor in component
* getting entries from server
* http.get(url) to get request
* implement logic to get onInit instead of constructor
  * constructor should not perform heavy operations
  * returns observables
  * has method *subscribe()* which notifies when result is available
* creting a new entry 
  * enter new data and on pressing Enter new entry is created 
* updating an entry
  * add button to update the entry 
  * on pressing button update a field of object in server
* delete in post
  * create a button to delete
* post service to connect with service and sync with component

* handling error 
  * expected error
    * not found error
      * clash sync
    * Bad request
      * e.g username already exists
  * unexpected error
    * server offline
    * network down 
    * unhandled exceptions
  * add new file common/app-error.ts to represent errors
  * replace global error handler with custom error handler (AppErrorHandler)
  * change in module.ts
  ```
  providers: [CoursesServiceService,
    PostService,
  {provide: ErrorHandler, useClass: AppErrorHandler}],    //RR_16
  ```
  * use map to map response to array of javascript object

### xx.component.html
``` html
<form>
  <input type="text" class="form-control"
  (keyup.enter)="addPost(title)" #title>
  <ul class="list-group">
    <li class="list-group-item"
    *ngFor="let post of posts"
    (click)="removeTopic(topic)" >
    <button
      (click)="updatePost(post)"
      class="btn btn-default btn-sm">Update</button>
    <button
      (click)="deletePost(post)"
      class="btn btn-default btn-sm">Del</button>
    {{post.title}}
    </li>
  </ul>
</form>

```
### xx.component.ts
``` javascript
import { NotFoundError } from '../not-found-error';
import { AppError } from './../app-error';
import { error } from 'util';
import { PostService } from './../post.service';
import * as console from 'console';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-course-form2',
  templateUrl: './new-course-form2.component.html',
  styleUrls: ['./new-course-form2.component.css']
})
export class NewCourseForm2Component implements OnInit {
  posts: any[];
  constructor(private service: PostService) {
  }

  addPost(input: HTMLInputElement) {
    let post: any = {title: input.value};
    input.value = '';
    this.service.create(post)
      .subscribe(
        newPost => {
          post.id = newPost.json().id;
          this.posts.splice(0, 0, post);
          //console.log(response.json());
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            //this.form.setErrors(error.JSON());
          }
          else throw error;
      });
  }

  updatePost(input: HTMLInputElement) {
    this.service.update(input)
      .subscribe(
        updatePost => {
          //console.log(response.json());
        });
  }

  deletePost(input:HTMLInputElement) {
    this.service.delete(input)
      .subscribe(
        () => {
          let index = this.posts.indexOf(input);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          }
      });
  }

  //method in invoked when component is created
  ngOnInit() {
    //don't perform heavy operation on constructor
    this.service.getAll()
        .subscribe(posts => {
          this.posts = posts;
        });
  }
}

```
### post.service.ts
``` javascript
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService extends DataService{
  constructor( http: Http) {
    super('http://jsonplaceholder.typicode.com/posts', http);
  }
}


```
### data.service.ts
``` javascript
import { NotFoundError } from './not-found-error';
import { AppError } from './app-error';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }
  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }
  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }
  update(resource) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
      .map(response => response.json())
      .catch(this.handleError);
  }
  delete(input) {
    return this.http.delete(this.url + '/' + input.id)
      .map(response => response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 400) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError());
  }
}


```
### app-error.ts
``` javascript
export class AppError {
 constructor (public originalError?: any) {}
}

```
### app-error-handler.ts
``` javascript
import { ErrorHandler } from '@angular/core';
export class AppErrorHandler implements ErrorHandler{
  handleError(error) {
    alert('unexpected error occured');
    // console.log(error);
  }
}

```
### not-found-error.ts
``` javascript
import { AppError } from './app-error';
export class NotFoundError extends AppError {

}

```
## Routing 
* import RouterModule from angular/router
* add path in module.ts
* add navbar component to implement navigation bar
* below navigation bar <router-outlet> is the tag where component will be rendered
* component can be linked to <router-outlet> using **routerLink** just like href
 * routerLink="component"
 * [routerLink]=["component","param1",.."optionalParam",..];
 * routerLinkActivated="active current" to mark if which link is active in bootstrap
* private route:ActivatedRoute in constructor
* to get parameter
  * router.paramMap can used to get parameter
  * this is observable

#### navbar.component.ts
#### navbar.component.html
#### xx.component.ts
#### xx.component.html
``` html
```

``` javascript
```

``` html

```
``` javascript

```
