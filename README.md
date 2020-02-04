# [BETA] fireflyio-router

Fireflyio router is a fireflyio module to manage and control the routing.  

## 🚀 Fireflyio

[Fireflyio server](https://github.com/dobobaie/fireflyio)  
[Fireflyio client](https://github.com/dobobaie/fireflyio-client)  
[Fireflyio module router](https://github.com/dobobaie/fireflyio-router)  
[Fireflyio module monitoring](https://github.com/dobobaie/fireflyio-monitoring)  
[Fireflyio module ui-monitoring](https://github.com/dobobaie/fireflyio-ui-monitoring)  

## ☁️ Installation

```
$ unavaible
```

## 👋 Hello fireflyio-monitoring

```js
const Fireflyio = require('fireflyio');
const FireflyioRouter = require('fireflyio-router');

const app = new Fireflyio();

const options = {};
app.extend(FireflyioRouter, options); // add the module

const { router } = app; // or use directly app.router.

// ...
```

## 📝 Methods

### `prefix` method

Set a prefix to each route you set.

```js
  router.prefix('/users').get('/:user_id', ...);
```

### `focus` method

`focus` is a kind of `prefix`.  
The difference is the you can declare your routes via the router parameter like the example below.  
The middleware declared in the focus method will be applied in the childRouter.  

```js
router.focus('/users', middleware, childRouter =>
  childRouter.get('/:user_id', other_middleware, ...)
);
```

### `get` method

`ctx.body` is used to return the body response to the client.

```js
router.get('/hello', middleware, ctx => {
  ctx.body = 'hello';
});
```

### `delete` method

`ctx.params.userId` is the parameter find in the query url.  

```js
router.delete('/users/:userId', middleware, ctx => {
  ctx.body = `User ${ctx.params.userId} has been deleted`;
});
```

### `post` method

`ctx.request.body` is the request body sent by the client.  

```js
router.post('/users', middleware, ctx => {
  ctx.body = `User ${ctx.request.body.username} has been added`;
});
```

### `put` method

`ctx.status` and `ctx.errorMessage` are return in the response field.  

```js
router.put('/users/:userId', middleware, ctx => {
  ctx.body = {
    error: 'User not found'
  };
  ctx.status = 404;
  ctx.errorMessage = 'User not found'; // same that body way but in response field
});
```

### `any` method

Register `/default` in all the methods.  

```js
router.any('/default', middleware, ctx => {
  ctx.body = 'hello';
});
```

## ⚙️ Options 

`const app = new Fireflyio(options: object);`   

Name parameter | Type | Default | Description
--- | --- | --- | ---
debug | `boolean` | `false` | Enable debug mode

## 👥 Contributing

Please help us to improve the project by contributing :)  

## ❓️ Testing

```
$ npm install
$ npm test
```
