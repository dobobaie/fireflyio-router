const RouteManager = require('./route');

const { Debug } = require('./utils');

const defaultOptions = {
  debug: false,
};

module.exports = class $fireflyioRouter
{
  constructor(fireflyio, custom_options) {
    this.name = 'router';
    this.options = Object.assign({}, defaultOptions, custom_options);
    this.debug = Debug(this.options).debug;
    this.fireflyio = fireflyio;

    this.modules = {};
    this.modules.route = new RouteManager(this.fireflyio, this.options, this.modules);

    this._prefix = '';
  }

  prefix(prefix) {
    this._prefix = prefix === '/' ? '' : prefix;
  }

  focus(...args) {
    const prefix = args.shift();
    const router = new $fireflyioRouter(null, this.options);
    router.prefix(prefix);

    const routes_declaration = args.pop();
    
    router.modules.route.push = (...focusargs) => {
      const method = focusargs.shift();
      const route = focusargs.shift();
      return this.modules.route.push(method, route, ...args, ...focusargs);
    };

    routes_declaration(router);

    return this;
  }

  get(...args) {
    this.modules.route.push('GET', this._prefix + args.shift(), ...args);
    return this;
  };
  
  delete(...args) {
    this.modules.route.push('DELETE', this._prefix + args.shift(), ...args);
    return this;
  };
  
  post(...args) {
    this.modules.route.push('POST', this._prefix + args.shift(), ...args);
    return this;
  };
  
  put(...args) {
    this.modules.route.push('PUT', this._prefix + args.shift(), ...args);
    return this;
  };

  any(...args) {
    this.get(...args).delete(...args).post(...args).put(...args);
    return this;
  }
};
