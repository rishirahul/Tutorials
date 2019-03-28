Callbacks, Promises and Async/Await
===================================

##### arrow functions 

```
_function() {}     function(a) {}      function(a,b) {}_
```
_can be replaced with_
```
_() =\> {}          a => {}            (a,b) => {}_
```
[_Read more about arrow functions here_](https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26)

* * *

Let’s say you have a function that will print a string after a random amount of time:
```
function printString(string){  
  setTimeout(  
    () =\> {  
      console.log(string)  
    },   
    `Math.floor(Math.random() * 100) + 1` )  
}
```
Let’s try to print the letters A, B, C in that order:
```
function printAll(){  
  printString("A")  
  printString("B")  
  printString("C")  
}

printAll()
```
You will notice that A, B, and C print in a different and random order each time you call_printAll_!

This is because these functions are asynchronous. Each function gets executed in order, but each one is independent with it’s own setTimeout. They won’t wait for the last function to finish before they start.

This is super annoying, so let’s fix it with a callback.

#### Callbacks

A callback is a function that is passed to another function. When the first function is done, it will run the second function.
```
function printString(string, callback){  
  setTimeout(  
    () =\> {  
      console.log(string)  
      callback()  
    },   
    Math.floor(Math.random() * 100) + 1 )  
}
```
You can see that is is super easy to modify the original function to work with callbacks.

Again, let’s try to print the letters A, B, C in that order:
```
function printAll(){  
  printString("A", () => {  
    printString("B", () => {  
      printString("C", () => {})  
    })  
  })  
}
printAll()
```

Well, the code is a lot uglier now, but at least it works! Each time you call printAll, you get the same result.

The problem with callbacks is it creates something called “Callback Hell.” Basically, you start nesting functions within functions within functions, and it starts to get really hard to read the code.

#### Promises

Promises try to fix this nesting problem.
Promises have three states:
*   **Pending**: This is the initial state of the Promise before an operation begins
*   **Fulfilled**: This means the specified operation was completed
*   **Rejected**: The operation did not complete; an error value is usually thrown

Let’s create a promise:

    const weather = true
    const date    = new Promise(function(resolve, reject) {
      if (weather) {
        const dateDetails = {
          name:     'Cubana Restaurant'
        };
        resolve(dateDetails)
      } else {
        reject(new Error('Bad weather, so no Date'))
      }
    });
    
Let’s change our function to use Promises
```
function printString(string){  
  return new Promise((resolve, reject) => { setTimeout(  
      () =\> {  
       console.log(string)  
       resolve()  
      },   
     Math.floor(Math.random() * 100) + 1 )  
  })  
}
```

You can see that it still looks pretty similar. You wrap the whole function in a Promise, and instead of calling the callback, you call resolve (or reject if there is an error). The function returns this Promise object.

Using a promise that has been created is relatively straightforward; we chain`.then()`and`.catch()`to our Promise like so:

    date
      .then(function(done) {
        // the content from the resolve() is here
      })
      .catch(function(error) {
        // the info from the reject() is here
      });

Again, let’s try to print the letters A, B, C in that order:
```
function printAll(){  
  printString("A")  
  .then(() => {  
    return printString("B")  
  })  
  .then(() => {  
    return printString("C")  
  })  
}

printAll()
```

This is called a Promise Chain. You can see that the code returns the result of the function (which will be a Promise), and this gets sent to the next function in the chain.

The code is no longer nested but it still looks messy!

By using features of arrow functions, we can remove the “wrapper” function. The code becomes cleaner, but still has a lot of unnecessary parenthesis:
```
function printAll(){  
  printString("A")  
  .then(() => printString("B"))  
  .then(() => printString("C"))  
}

printAll()
```

#### Await

Await is basically syntactic sugar for Promises. It makes your asynchronous code look more like synchronous/procedural code, which is easier for humans to understand.

The_printString_function doesn’t change at all from the promise version.

Again, let’s try to print the letters A, B, C in that order:
```
async function printAll(){  
  await printString("A")  
  await printString("B")  
  await printString("C")  
}

printAll()
```
Yeah…. MUCH better!

You might notice that we use the “async” keyword for the wrapper function_printAll_. This let’s JavaScript know that we are using async/await syntax, and is necessary if you want to use Await. This means you can’t use Await at the global level; it always needs a wrapper function. Most JavaScript code runs inside a function, so this isn’t a big deal.


## Async Await advanced
Async/await
===========

There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.

[Async functions](https://javascript.info/async-await#async-functions)
----------------------------------------------------------------------

Let’s start with the`async`keyword. It can be placed before a function, like this:

    async function f() {
      return 1;
    }

The word “async” before a function means one simple thing: a function always returns a promise. Even If a function actually returns a non-promise value, prepending the function definition with the “async” keyword directs Javascript to automatically wrap that value in a resolved promise.

For instance, the code above returns a resolved promise with the result of`1`, let’s test it:

    async function f() {
      return 1;
    }
    
    f().then(alert); // 1

…We could explicitly return a promise, that would be the same:

    async function f() {
      return Promise.resolve(1);
    }
    
    f().then(alert); // 1

So,`async`ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword,`await`, that works only inside`async`functions, and it’s pretty cool.

[Await](https://javascript.info/async-await#await)
--------------------------------------------------

The syntax:

    // works only inside async functions
    let value = await promise;

The keyword`await`makes JavaScript wait until that promise settles and returns its result.

Here’s an example with a promise that resolves in 1 second:

    
    
    
    
    
    
    
    

The function execution “pauses” at the line`(*)`and resumes when the promise settles, with`result`becoming its result. So the code above shows “done!” in one second.

Let’s emphasize:`await`literally makes JavaScript wait until the promise settles, and then go on with the result. That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

It’s just a more elegant syntax of getting the promise result than`promise.then`, easier to read and write.

Can’t use`await`in regular functions

If we try to use`await`in non-async function, that would be a syntax error:

    
    
    
    

We will get this error if we do not put`async`before a function. As said,`await`only works inside an`async function`.

Let’s take the`showAvatar()`example from the chapter[Promises chaining](https://javascript.info/promise-chaining)and rewrite it using`async/await`:

1.  We’ll need to replace`.then`calls with`await`.
2.  Also we should make the function`async`for them to work.
```
    async function showAvatar() {
    
      // read our JSON
      let response = await fetch('/article/promise-chaining/user.json');
      let user = await response.json();
    
      // read github user
      let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
      let githubUser = await githubResponse.json();
    
      // show the avatar
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);
    
      // wait 3 seconds
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    
      img.remove();
    
      return githubUser;
    }
    
    showAvatar();
```
Pretty clean and easy to read, right? Much better than before.

`await`won’t work in the top-level code

People who are just starting to use`await`tend to forget the fact that we can’t use`await`in top-level code. For example, this will not work:

    // syntax error in top-level code
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

So we need to have a wrapping async function for the code that awaits. Just as in the example above.

`await`accepts thenables

Like`promise.then`,`await`allows to use thenable objects (those with a callable`then`method). Again, the idea is that a 3rd-party object may not be a promise, but promise-compatible: if it supports`.then`, that’s enough to use with`await`.

For instance, here`await`accepts`new Thenable(1)`:

    class Thenable {
      constructor(num) {
        this.num = num;
      }
      then(resolve, reject) {
        alert(resolve); // function() { native code }
        // resolve with this.num*2 after 1000ms
        setTimeout(() => resolve(this.num * 2), 1000); // (*)
      }
    };
    
    async function f() {
      // waits for 1 second, then result becomes 2
      let result = await new Thenable(1);
      alert(result);
    }
    
    f();

If`await`gets a non-promise object with`.then`, it calls that method providing native functions`resolve`,`reject`as arguments. Then`await`waits until one of them is called (in the example above it happens in the line`(*)`) and then proceeds with the result.

Async methods

A class method can also be async, just put`async`before it.

Like here:

    
    
    

The meaning is the same: it ensures that the returned value is a promise and enables`await`.

[Error handling](https://javascript.info/async-await#error-handling)
--------------------------------------------------------------------

If a promise resolves normally, then`await promise`returns the result. But in case of a rejection, it throws the error, just as if there were a`throw`statement at that line.

This code:

    
    
    

…Is the same as this:

    
    
    

In real situations, the promise may take some time before it rejects. So`await`will wait, and then throw an error.

We can catch that error using`try..catch`, the same way as a regular`throw`:

    
    
    
    
    
    
    

In case of an error, the control jumps to the`catch`block. We can also wrap multiple lines:

    async function f() {
    
      try {
        let response = await fetch('/no-user-here');
        let user = await response.json();
      } catch(err) {
        // catches errors both in fetch and response.json
        alert(err);
      }
    }
    
    f();

If we don’t have`try..catch`, then the promise generated by the call of the async function`f()`becomes rejected. We can append`.catch`to handle it:

    
    
    
    
    
    
    

If we forget to add`.catch`there, then we get an unhandled promise error (and can see it in the console). We can catch such errors using a global event handler as described in the chapter[Error handling with promises](https://javascript.info/promise-error-handling).

`async/await`and`promise.then/catch`

When we use`async/await`, we rarely need`.then`, because`await`handles the waiting for us. And we can use a regular`try..catch`instead of`.catch`. That’s usually (not always) more convenient.

But at the top level of the code, when we’re outside of any`async`function, we’re syntactically unable to use`await`, so it’s a normal practice to add`.then/catch`to handle the final result or falling-through errors.

Like in the line`(*)`of the example above.

`async/await`works well with`Promise.all`

When we need to wait for multiple promises, we can wrap them in`Promise.all`and then`await`:

    // wait for the array of results
    let results = await Promise.all([
      fetch(url1),
      fetch(url2),
      ...
    ]);

In case of an error, it propagates as usual: from the failed promise to`Promise.all`, and then becomes an exception that we can catch using`try..catch`around the call.

[Microtask queue](https://javascript.info/async-await#microtask-queue)
----------------------------------------------------------------------

As we’ve seen in the chapter[Microtasks and event loop](https://javascript.info/microtask-queue), promise handlers are executed asynchronously. Every`.then/catch/finally`handler first gets into the “microtask queue” and executed after the current code is complete.

`Async/await`is based on promises, so it uses the same microtask queue internally, and has the similar priority over macrotasks.

For instance, we have:

*   `setTimeout(handler, 0)`, that should run`handler`with zero delay.
*   `let x = await f()`, function`f()`is async, but returns immediateley.

Which one runs first if`await`is_below_`setTimeout`in the code?

    async function f() {
      return 1;
    }
    
    (async () => {
        setTimeout(() => alert('timeout'), 0);
    
        await f();
    
        alert('await');
    })();

There’s no ambiguity here:`await`always finishes first, because (as a microtask) it has a higher priority than`setTimeout`handling.

[Summary](https://javascript.info/async-await#summary)
------------------------------------------------------

The`async`keyword before a function has two effects:

1.  Makes it always return a promise.
2.  Allows to use`await`in it.

The`await`keyword before a promise makes JavaScript wait until that promise settles, and then:

1.  If it’s an error, the exception is generated, same as if`throw error`were called at that very place.
2.  Otherwise, it returns the result, so we can assign it to a value.

Together they provide a great framework to write asynchronous code that is easy both to read and write.

With`async/await`we rarely need to write`promise.then/catch`, but we still shouldn’t forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also`Promise.all`is a nice thing to wait for many tasks simultaneously.

[Tasks](https://javascript.info/async-await#tasks)
--------------------------------------------------

### [Rewrite using async/await](https://javascript.info/async-await#rewrite-using-async-await)

[](https://javascript.info/task/rewrite-async)

Rewrite the one of examples from the chapter[Promises chaining](https://javascript.info/promise-chaining)using`async/await`instead of`.then/catch`:

    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
    }
    
    loadJson('no-such-user.json') // (3)
      .catch(alert); // Error: 404

solution

### [Rewrite "rethrow" async/await](https://javascript.info/async-await#rewrite-rethrow-async-await)

[](https://javascript.info/task/rewrite-async-2)

Below you can find the “rethrow” example from the chapter[Promises chaining](https://javascript.info/promise-chaining). Rewrite it using`async/await`instead of`.then/catch`.

And get rid of the recursion in favour of a loop in`demoGithubUser`: with`async/await`that becomes easy to do.

    class HttpError extends Error {
      constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
      }
    }
    
    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new HttpError(response);
          }
        })
    }
    
    // Ask for a user name until github returns a valid user
    function demoGithubUser() {
      let name = prompt("Enter a name?", "iliakan");
    
      return loadJson(`https://api.github.com/users/${name}`)
        .then(user => {
          alert(`Full name: ${user.name}.`);
          return user;
        })
        .catch(err => {
          if (err instanceof HttpError && err.response.status == 404) {
            alert("No such user, please reenter.");
            return demoGithubUser();
          } else {
            throw err;
          }
        });
    }
    
    demoGithubUser();

solution

### [Call async from non-async](https://javascript.info/async-await#call-async-from-non-async)

[](https://javascript.info/task/async-from-regular)

We have a “regular” function. How to call`async`from it and use its result?

    async function wait() {
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      return 10;
    }
    
    function f() {
      // ...what to write here?
      // we need to call async wait() and wait to get 10
      // remember, we can't use "await"
    }

P.S. The task is technically very simple, but the question is quite common for developers new to async/await.

That’s the case when knowing how it works inside is helpful.

Just treat async call as promise and attach .then to it:

```
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // shows 10 after 1 second
  wait().then(result => alert(result));
}

f();
```
