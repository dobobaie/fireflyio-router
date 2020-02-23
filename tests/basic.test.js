const Fireflyio = require('../../fireflyio/lib');
const FireflyioRouter = require('../lib');

(async () => {
  const app = new Fireflyio({ debug: true, allowedHttpRequests: true });

  app.extend(FireflyioRouter);

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  app
    .router
    .focus('/users', router =>
      router.delete('/:id/delete', ctx => {
        console.log('/users/:id/delete', ctx);
        ctx.body = {
          result: true
        };
      })
    )
    .post('/login', ctx => {
      console.log('/login', ctx);
      ctx.body = {
        result: true
      };
    })
    .get('/hello', ctx => {
      console.log('/hello', ctx);
      ctx.body = {
        message: 'Hello'
      };
    });

  app.socket.on("clientConnected", client =>
    client.emit("HELLO_CLIENT", (_, next) => {
      // everything is ok
      next();
    }, 'Hello Fireflyio')
  );

  await app.listen(4000);
})();
