import { Buffer as Buffer$1 } from 'buffer';
import axios from 'axios';
import { toDataURL } from 'qrcode';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

function fetchPayload(_x) {
  return _fetchPayload.apply(this, arguments);
}

function _fetchPayload() {
  _fetchPayload = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref) {
    var url, DPP, codMun, axiosOptions;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _ref.url, DPP = _ref.DPP, codMun = _ref.codMun;
            axiosOptions = {
              headers: {//accept: 'x/y',
                //mode: 'no-cors',
              },
              params: {
                DPP: DPP,
                codMun: codMun
              }
            };
            return _context.abrupt("return", axios.get('https://' + url, axiosOptions).then(function (_ref2) {
              var data = _ref2.data,
                  status = _ref2.status;
              if (status !== 200) throw new Error('HTTP ' + status);
              return data;
            }).then(function (jws) {
              var parts = jws.split('.').map(function (b64) {
                return Buffer$1.from(b64, 'base64');
              });
              var pixFetch = {
                jwsString: jws,
                jws: {
                  hdr: parts[0],
                  payload: parts[1],
                  signature: parts[2]
                },
                header: JSON.parse(parts[0].toString()),
                payload: JSON.parse(parts[1].toString())
              };
              return pixFetch;
            })["catch"](function (error) {
              console.log(error);
              throw error;
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchPayload.apply(this, arguments);
}

var EMVQR;

(function (EMVQR) {
  EMVQR[EMVQR["TAG_INIT"] = 0] = "TAG_INIT";
  EMVQR[EMVQR["TAG_CRC"] = 63] = "TAG_CRC";
  EMVQR[EMVQR["TAG_MAX"] = 99] = "TAG_MAX";
  EMVQR[EMVQR["TAG_ONETIME_PAYMENT"] = 2] = "TAG_ONETIME_PAYMENT";
  EMVQR[EMVQR["TAG_MCC"] = 52] = "TAG_MCC";
  EMVQR[EMVQR["TAG_TRANSACTION_CURRENCY"] = 53] = "TAG_TRANSACTION_CURRENCY";
  EMVQR[EMVQR["TAG_TRANSACTION_AMOUNT"] = 54] = "TAG_TRANSACTION_AMOUNT";
  EMVQR[EMVQR["TAG_COUNTRY_CODE"] = 58] = "TAG_COUNTRY_CODE";
  EMVQR[EMVQR["TAG_MERCHANT_NAME"] = 59] = "TAG_MERCHANT_NAME";
  EMVQR[EMVQR["TAG_MERCHANT_CITY"] = 60] = "TAG_MERCHANT_CITY";
  EMVQR[EMVQR["MAI_STANDARD_FIRST"] = 2] = "MAI_STANDARD_FIRST";
  EMVQR[EMVQR["MAI_TEMPLATE_FIRST"] = 26] = "MAI_TEMPLATE_FIRST";
  EMVQR[EMVQR["MAI_TEMPLATE_LAST"] = 51] = "MAI_TEMPLATE_LAST";
  EMVQR[EMVQR["TAG_TEMPLATE_GUI"] = 0] = "TAG_TEMPLATE_GUI";
  EMVQR[EMVQR["TAG_ADDITIONAL_DATA"] = 62] = "TAG_ADDITIONAL_DATA";
  EMVQR[EMVQR["TAG_AD_REF_LABEL"] = 5] = "TAG_AD_REF_LABEL";
})(EMVQR || (EMVQR = {}));

function numToHex(n, digits) {
  var hex = n.toString(16).toUpperCase();

  if (digits) {
    return ('0'.repeat(digits) + hex).slice(-digits);
  }

  return hex.length % 2 === 0 ? hex : '0' + hex;
}
function valueIn(setof, value) {
  return setof.indexOf(value) >= 0;
}

var paymentSystemSpecificTemplateMap = {
  0: {
    name: 'Globally Unique Identifier',
    length: {
      max: 32
    },
    optional: true
  },
  1: {
    lastTag: 99,
    name: 'Payment System specific',
    optional: true
  }
};
var reservedTemplateMap = {
  0: {
    name: 'Globally Unique Identifier',
    length: {
      max: 32
    },
    optional: true
  },
  1: {
    lastTag: 99,
    name: 'Context specific data',
    optional: true
  }
};
var additionalDataFieldMap = {
  1: {
    name: 'Bill Number',
    length: {
      max: 25
    },
    optional: true
  },
  2: {
    name: 'Mobile Number',
    length: {
      max: 25
    },
    optional: true
  },
  3: {
    name: 'Store Label',
    length: {
      max: 25
    },
    optional: true
  },
  4: {
    name: 'Loyalty Number',
    length: {
      max: 25
    },
    optional: true
  },
  5: {
    name: 'Reference Label',
    length: {
      max: 25
    },
    optional: true
  },
  6: {
    name: 'Customer Label',
    length: {
      max: 25
    },
    optional: true
  },
  7: {
    name: 'Terminal Label',
    length: {
      max: 25
    },
    optional: true
  },
  8: {
    name: 'Purpose of Transaction',
    length: {
      max: 25
    },
    optional: true
  },
  9: {
    name: 'Additional Consumer Data Request',
    length: {
      max: 25
    },
    optional: true
  },
  10: {
    lastTag: 49,
    name: 'RFU for EMVCo',
    optional: true
  },
  50: {
    lastTag: 99,
    name: 'Payment System specific template',
    optional: true,
    elementMap: paymentSystemSpecificTemplateMap
  }
};
var merchantInformationLanguageTemplateMap = {
  0: {
    name: 'Language Preference',
    optional: true
  },
  1: {
    name: 'Merchant Name - Alternate Language',
    optional: true
  },
  3: {
    name: 'Merchant City - Alternate Language',
    optional: true
  }
};
var rootSchemaMap = {
  0: {
    name: 'Payload Format Indicator',
    length: 2,
    pattern: /^01$/
  },
  1: {
    name: 'Point of Initiation Method',
    optional: true,
    length: 2,
    pattern: /^1[12]$/
  },
  2: {
    lastTag: 25,
    name: 'Merchant Account Information',
    length: {
      max: 99
    }
  },
  26: {
    lastTag: 51,
    name: 'Merchant Account Information',
    elementMap: paymentSystemSpecificTemplateMap
  },
  52: {
    name: 'Merchant Category Code',
    length: 4,
    pattern: /^\d*$/
  },
  53: {
    name: 'Transaction Currency',
    length: 3,
    pattern: /^\d*$/
  },
  54: {
    name: 'Transaction Amount',
    length: {
      max: 13
    },
    pattern: /^[\d]+(.\d\d)?$/
  },
  55: {
    name: 'Tip or Convenience Indicator',
    length: 2,
    optional: true
  },
  56: {
    name: 'Value of Convenience Fee Fixed',
    length: {
      max: 13
    },
    pattern: /^[\d]+(.\d\d)?$/ //    presence: 'C',

  },
  57: {
    name: 'Value of Convenience Fee Percentage' //    presence: 'C',

  },
  58: {
    name: 'Country Code',
    length: 2
  },
  59: {
    name: 'Merchant Name',
    length: {
      max: 25
    }
  },
  60: {
    name: 'Merchant City'
  },
  61: {
    name: 'Postal Code',
    optional: true
  },
  62: {
    name: 'Additional Data Field Template',
    optional: true,
    elementMap: additionalDataFieldMap
  },
  63: {
    name: 'CRC',
    pattern: /^[A-Fa-f\d]*$/
  },
  64: {
    name: 'Merchant Information — Language Template',
    optional: true,
    elementMap: merchantInformationLanguageTemplateMap
  },
  65: {
    lastTag: 79,
    name: 'RFU for EMVCo',
    optional: true
  },
  80: {
    lastTag: 99,
    name: 'Unreserved Templates',
    optional: true,
    elementMap: reservedTemplateMap
  }
};
var rootEMVSchema = {
  name: 'root',
  elementMap: rootSchemaMap
};
function lookupNodeSchema(schema, node, tag) {
  var _elementMap;

  var elementMap = schema == null ? void 0 : schema.elementMap;

  if (schema != null && schema.identifiedElementMap) {
    if (node.hasElement(EMVQR.TAG_TEMPLATE_GUI)) {
      var gui = node.getElement(EMVQR.TAG_TEMPLATE_GUI).content.toUpperCase(); // TODO: Replace with map()

      for (var xx in schema.identifiedElementMap) {
        if (xx.toUpperCase() === gui) {
          elementMap = _extends({}, elementMap, schema.identifiedElementMap[xx]);
        }
      }
    }
  }

  var nodeSchema = {
    name: 'Unknown',
    elementMap: {}
  };

  if ((_elementMap = elementMap) != null && _elementMap[tag]) {
    nodeSchema = elementMap[tag];
  } else {
    // Not found ..
    for (var _xx in elementMap) {
      var elTag = parseInt(_xx);
      var el = elementMap[elTag];

      if (tag >= elTag && el.lastTag && tag <= el.lastTag) {
        nodeSchema = el;
      }
    }
  }

  return nodeSchema;
}

function computeCRC(str, invert) {
  if (invert === void 0) {
    invert = false;
  }

  var bytes = new TextEncoder().encode(str);
  var crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
  var crc = 0xffff;

  for (var i = 0; i < bytes.length; i++) {
    var c = bytes[i];
    var j = (c ^ crc >> 8) & 0xff;
    crc = crcTable[j] ^ crc << 8;
  }

  var answer = (crc ^ 0) & 0xffff;
  var hex = numToHex(answer, 4);
  if (invert) return hex.slice(2) + hex.slice(0, 2);
  return hex;
}

var ValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ValidationError, _Error);

  function ValidationError(errorCode, message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.errorCode = void 0;
    _this.errorName = '';
    _this.errorCode = errorCode;
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var RuleValidator = /*#__PURE__*/function () {
  function RuleValidator(ruleInfo) {
    this.ruleInfo = void 0;
    this.parent = void 0;
    this.childValidators = [];
    this.result = {
      status: 'none'
    };
    this.ruleInfo = ruleInfo;
  }

  RuleValidator.get = function get(info) {
    var v = new RuleValidator(info);
    return v;
  };

  var _proto = RuleValidator.prototype;

  _proto.addRule = function addRule(info) {
    return this.addValidator(RuleValidator.get(info));
  };

  _proto.addValidator = function addValidator(rule) {
    rule.parent = this;
    this.childValidators.push(rule);
    return this;
  };

  _proto.handleResult = function handleResult(res, observer, isFinal) {
    if (isFinal === void 0) {
      isFinal = false;
    }

    var previousStatus = this.result.status;

    switch (res.status) {
      case 'none':
      case 'not-applicable':
      case 'running':
        this.result = res;
        break;

      case 'pass':
        if (isFinal && this.result.status === 'running') {
          this.result = res;
        }

        break;

      case 'inconclusive':
        if (this.result.status !== 'fail') {
          this.result = res;
        }

        break;

      case 'fail':
        if (this.result.status !== 'fail') {
          this.result = res;
        }

        break;
    }

    if (observer && previousStatus !== this.result.status) observer(this, this.result);
    return this.result;
  };

  _proto.executeRule = /*#__PURE__*/function () {
    var _executeRule = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(context) {
      var result, res;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = {
                status: 'pass'
              };

              if (!this.ruleInfo.rule) {
                _context.next = 18;
                break;
              }

              _context.prev = 2;
              res = this.ruleInfo.rule(context, this);

              if (!res) {
                _context.next = 13;
                break;
              }

              if (!(res instanceof Promise)) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return Promise.resolve(res);

            case 8:
              _context.t0 = _context.sent;
              _context.next = 12;
              break;

            case 11:
              _context.t0 = res;

            case 12:
              result = _context.t0;

            case 13:
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t1 = _context["catch"](2);
              result = {
                status: 'fail',
                error: _context.t1 instanceof ValidationError ? _context.t1 : new ValidationError(_context.t1)
              };

            case 18:
              return _context.abrupt("return", result);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 15]]);
    }));

    function executeRule(_x) {
      return _executeRule.apply(this, arguments);
    }

    return executeRule;
  }();

  _proto.validate = /*#__PURE__*/function () {
    var _validate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(context, observer) {
      var shouldExec, _iterator, _step, child, childResult;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.result = {
                status: 'none'
              };
              shouldExec = !this.ruleInfo.when || this.ruleInfo.when(context, this);

              if (!shouldExec) {
                _context2.next = 25;
                break;
              }

              // Reset result status
              this.handleResult({
                status: 'running'
              }, observer);

              if (!this.ruleInfo.rule) {
                _context2.next = 11;
                break;
              }

              _context2.t0 = this;
              _context2.next = 8;
              return this.executeRule(context);

            case 8:
              _context2.t1 = _context2.sent;
              _context2.t2 = observer;

              _context2.t0.handleResult.call(_context2.t0, _context2.t1, _context2.t2);

            case 11:
              _iterator = _createForOfIteratorHelperLoose(this.childValidators);

            case 12:
              if ((_step = _iterator()).done) {
                _context2.next = 22;
                break;
              }

              child = _step.value;

              if (!(this.result.status !== 'running')) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("break", 22);

            case 16:
              _context2.next = 18;
              return child.validate(context, observer);

            case 18:
              childResult = _context2.sent;
              // Propagate child errors to me
              this.handleResult(childResult, observer);

            case 20:
              _context2.next = 12;
              break;

            case 22:
              if (this.result.status === 'running') this.handleResult({
                status: 'pass'
              }, observer, true);
              _context2.next = 26;
              break;

            case 25:
              this.handleResult({
                status: 'not-applicable'
              }, observer, true);

            case 26:
              return _context2.abrupt("return", this.result);

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function validate(_x2, _x3) {
      return _validate.apply(this, arguments);
    }

    return validate;
  }();

  return RuleValidator;
}();

var QRErrorCode;

(function (QRErrorCode) {
  QRErrorCode[QRErrorCode["INVALID_PARAM"] = 0] = "INVALID_PARAM";
  QRErrorCode[QRErrorCode["INVALID_QRCODE"] = 1] = "INVALID_QRCODE";
  QRErrorCode[QRErrorCode["CRC_MISMATCH"] = 2] = "CRC_MISMATCH";
  QRErrorCode[QRErrorCode["MISSING_MANDATORY_ELEMENT"] = 3] = "MISSING_MANDATORY_ELEMENT";
  QRErrorCode[QRErrorCode["INVALID_ELEMENT"] = 4] = "INVALID_ELEMENT";
})(QRErrorCode || (QRErrorCode = {}));

var QRCodeError = /*#__PURE__*/function (_ValidationError) {
  _inheritsLoose(QRCodeError, _ValidationError);

  function QRCodeError(errorCode, message) {
    var _this;

    _this = _ValidationError.call(this, errorCode, message) || this;
    _this.errorCode = void 0;
    _this.errorCode = errorCode;
    _this.errorName = 'EMVQR-' + QRErrorCode[errorCode];
    return _this;
  }

  return QRCodeError;
}(ValidationError);
var mandatoryElements = [EMVQR.TAG_INIT, EMVQR.TAG_MCC, EMVQR.TAG_TRANSACTION_CURRENCY, EMVQR.TAG_COUNTRY_CODE, EMVQR.TAG_MERCHANT_NAME, EMVQR.TAG_MERCHANT_CITY, EMVQR.TAG_CRC // CRC
];

function validateElement(val, schema, path) {
  //console.log( "Validating: " + path + `[${val}]` )
  // optional?
  if (!val) {
    if (!schema.optional) throw new QRCodeError(QRErrorCode.MISSING_MANDATORY_ELEMENT, "Element " + path + " missing and is mandatory");
    return;
  } // length


  if (schema != null && schema.length) {
    if (schema.length instanceof Object) {
      var lenInfo = schema.length;
      if (lenInfo.max && val.length > lenInfo.max) throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, "Element " + path + " must have maximum length of " + lenInfo.max);
      if (lenInfo.min && val.length < lenInfo.min) throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, "Element " + path + " must have minimum length of " + lenInfo.min);
    } else {
      if (val.length !== schema.length) throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, "Element " + path + " must have length of " + schema.length);
    }
  } // pattern regex


  if (schema != null && schema.pattern) {
    var pattern = schema.pattern instanceof RegExp ? schema.pattern : new RegExp(schema.pattern); //console.log( `pattern /${pattern.source}/ (${val}) => ${pattern.test(val)}`)

    if (!pattern.test(val)) throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, "Element " + path + " has invalid contents");
  }
}

function validateNode(node, schema, path) {
  if (path === void 0) {
    path = '';
  }

  //console.log( "Validating: " + path + `=[${node.content}]:${node.type}` )
  if (node.isType('data')) {
    validateElement(node.content, schema, path);
  } else {
    node.elements.forEach(function (element) {
      var nodeSchema = lookupNodeSchema(schema, node, element.tag);
      var elementPath = path + (path.length ? ':' : '') + ('00' + element.tag).slice(-2);
      validateNode(element, nodeSchema, elementPath);
    });
  }
}

function getRuleValidator() {
  return RuleValidator.get({
    id: 'EMVQR'
  }).addRule({
    id: 'start-element-00',
    description: "Initial element is '00' with contents '01'",
    rule: function rule(root) {
      if (root.getElement(0).baseOffset !== 0) {
        throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Missing start element (00)');
      }

      if (root.getElement(0).content !== '01') {
        throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Invalid value for start element (00)');
      }
    }
  }).addRule({
    id: 'final-element-63',
    description: "Final element is CRC '63'",
    rule: function rule(root) {
      var crcEl = root.getElement(EMVQR.TAG_CRC);

      if (crcEl.baseOffset !== root.content.length - 8 || root.content.slice(-8, -4) !== '6304') {
        throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'CRC must be final element (63)');
      }
    }
  }).addRule({
    id: 'valid-crc',
    description: 'CRC is valid',
    rule: function rule(root) {
      var crcEl = root.getElement(EMVQR.TAG_CRC); // 3. CRC Correct

      var calculatedCRC = computeCRC(root.content.slice(0, -4));

      if (calculatedCRC !== crcEl.content) {
        throw new QRCodeError(QRErrorCode.CRC_MISMATCH, 'Invalid CRC');
      }
    }
  }).addRule({
    id: 'one-or-more-mai',
    description: 'Contains one or more Merchant Account Information elements',
    rule: function rule(root) {
      var maiList = Array.from(root.elements.keys()).filter(function (v) {
        return v >= 2 && v <= 51;
      });

      if (maiList.length === 0) {
        throw new QRCodeError(QRErrorCode.MISSING_MANDATORY_ELEMENT, 'Must have at least one Merchant Account Information');
      }
    }
  }).addRule({
    id: 'mandatory-elements',
    description: 'Contains EMV mandatory elements',
    rule: function rule(root) {
      mandatoryElements.forEach(function (tag) {
        if (!root.hasElement(tag)) throw new QRCodeError(QRErrorCode.MISSING_MANDATORY_ELEMENT, 'Missing mandatory tag (' + tag + ')');
      });
    }
  }).addRule({
    id: 'valid-elements',
    description: 'Elements are valid',
    rule: function rule(root) {
      validateNode(root, rootEMVSchema);
    }
  });
}

var QRCodeNode = /*#__PURE__*/function () {
  var _proto = QRCodeNode.prototype;

  _proto.isType = function isType(type) {
    return this.type === type;
  };

  _proto.isTemplate = function isTemplate() {
    return this.isType('template') || this.isType('identified-template');
  };

  function QRCodeNode(type, content, tag, baseOffset) {
    if (baseOffset === void 0) {
      baseOffset = 0;
    }

    this.type = void 0;
    this.content = void 0;
    this.baseOffset = void 0;
    this.elements = void 0;
    this.tag = void 0;
    this.type = type;
    this.baseOffset = baseOffset;
    this.content = content;

    switch (type) {
      case 'root':
      case 'template':
        this.elements = this.parseElementSequence(content, baseOffset);
        break;

      default:
        this.elements = new Map();
    }

    if (!tag) return;
    this.tag = tag;
  }

  _proto.parseElementSequence = function parseElementSequence(sequence, baseOffset) {
    if (baseOffset === void 0) {
      baseOffset = 0;
    }

    var elements = new Map();
    var end = sequence.length;
    var index = 0;

    while (index + 4 < end) {
      var pos = baseOffset + index;

      if (!/^\d{4}$/.test(sequence.substr(index, 4))) {
        throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Error parsing qrcode string: invalid tag or length characters @ ' + (1 + pos));
      }

      var tag = parseInt(sequence.substr(index, 2));
      var len = parseInt(sequence.substr(index + 2, 2));

      if (index + len + 4 > end) {
        throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Error parsing qrcode string: invalid length @' + (1 + pos));
      }

      var content = sequence.substr(index + 2 + 2, len);
      elements.set(tag, new QRCodeNode('data', content, tag, pos));
      index += 4 + len;
    }

    if (index !== end) {
      throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Error parsing qrcode string: extra characters at end @' + (1 + baseOffset + index));
    }

    return elements;
  };

  _proto.parseAsTemplate = function parseAsTemplate(isIdentified) {
    if (!this.isTemplate()) {
      this.elements = this.parseElementSequence(this.content, this.baseOffset);
      this.type = isIdentified ? 'identified-template' : 'template';
    }

    return this;
  };

  _proto.hasElement = function hasElement(tag) {
    return this.elements.has(tag);
  };

  _proto.getElement = function getElement(tag) {
    if (!this.elements.has(tag)) return new QRCodeNode('void', '', tag);
    return this.elements.get(tag);
  };

  _proto.newDataElement = function newDataElement(tag, content) {
    var node = new QRCodeNode('data', content, tag);
    this.elements.set(tag, node);
    return node;
  };

  _proto.newTemplateElement = function newTemplateElement(tag, lastTag, isIdentified, nodes) {
    if (isIdentified === void 0) {
      isIdentified = false;
    }

    if (!lastTag) lastTag = tag;

    while (tag <= lastTag) {
      if (!this.hasElement(tag)) {
        var node = new QRCodeNode(isIdentified ? 'identified-template' : 'template', '', tag);

        if (nodes) {
          for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done;) {
            var child = _step.value;
            node.elements.set(child.tag, child);
          }
        }

        this.elements.set(tag, node);
        return node;
      }

      ++tag;
    }

    throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, 'Unable to insert template');
  };

  _proto.deleteElement = function deleteElement(tag) {
    this.elements["delete"](tag);
  };

  _proto.toJSON = function toJSON() {
    var _this$tag;

    var json = {
      type: this.type,
      tag: (_this$tag = this.tag) != null ? _this$tag : undefined,
      content: this.content,
      elements: !this.isType('data') ? Array.from(this.elements.values()).map(function (value) {
        return value.toJSON();
      }) : undefined
    };
    return json;
  };

  _proto.ensureDataElement = function ensureDataElement(tag, defaultContent) {
    if (defaultContent === void 0) {
      defaultContent = '';
    }

    return this.hasElement(tag) ? this.getElement(tag) : this.newDataElement(tag, defaultContent);
  };

  _proto.buildTagLength = function buildTagLength() {
    var ts = ('00' + this.tag.toString()).slice(-2);
    var len = ('00' + this.content.length.toString()).slice(-2);
    return ts + len;
  };

  _proto.buildQRString = function buildQRString(offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var isRoot = this.isType('root');

    if (isRoot) {
      console.log(this.elements); // TODO: Reorder elements by tag
      // this.elements = new Map(
      //   this.elements.sort((a, b) => (a[0] > b[0] ? 1 : -1))
      // );
    }

    this.baseOffset = offset;
    if (!isRoot) offset += 2 + 2; // rebuild content from children

    if (!this.isType('data')) {
      var qrs = [];
      this.elements.forEach(function (element) {
        if (!isRoot || !valueIn([EMVQR.TAG_INIT, EMVQR.TAG_CRC], element.tag)) {
          var els = element.buildQRString(offset);
          qrs.push(els);
          offset += els.length;
        }
      });
      this.content = qrs.join('');
    }

    return !isRoot ? this.buildTagLength() + this.content : this.content;
  };

  _proto.findIdentifiedTemplate = function findIdentifiedTemplate(id, first, last) {
    if (first === void 0) {
      first = 0;
    }

    if (last === void 0) {
      last = EMVQR.TAG_MAX;
    }

    var found = [];
    this.elements.forEach(function (element) {
      if (element.isType('identified-template') && element.tag >= first && element.tag <= last && element.hasElement(EMVQR.TAG_TEMPLATE_GUI) && element.getElement(EMVQR.TAG_TEMPLATE_GUI).content.toUpperCase() === id.toUpperCase()) {
        found.push(element);
      }
    });
    return found;
  };

  return QRCodeNode;
}();

var defaultParams = {
  encoding: 'utf8'
};

var convertCode = function convertCode(qrCode, encoding) {
  if (qrCode === void 0) {
    qrCode = '';
  }

  if (encoding === void 0) {
    encoding = 'utf8';
  }

  switch (encoding) {
    case 'utf8':
      return qrCode;

    case 'base64':
      {
        var u8 = Buffer.from(qrCode, 'base64');
        return new TextDecoder().decode(u8);
      }

    default:
      throw new QRCodeError(QRErrorCode.INVALID_PARAM, "encoding must be 'utf8' or 'base64'");
  }
};

var EMVMerchantQRCode = /*#__PURE__*/function (_QRCodeNode) {
  _inheritsLoose(EMVMerchantQRCode, _QRCodeNode);

  function EMVMerchantQRCode(qrCode, params) {
    var _this;

    _this = _QRCodeNode.call(this, 'root', convertCode(qrCode, params.encoding)) || this;
    _this.type = 'root';
    return _this;
  }

  EMVMerchantQRCode.createCode = function createCode(basicElements) {
    var root = new EMVMerchantQRCode('', {
      encoding: 'utf8'
    });

    if (basicElements) {
      root.newDataElement(EMVQR.TAG_MCC, basicElements.merchantCategoryCode);
      root.newDataElement(EMVQR.TAG_TRANSACTION_CURRENCY, ('000' + basicElements.transactionCurrency).slice(-3));
      root.newDataElement(EMVQR.TAG_COUNTRY_CODE, basicElements.countryCode);
      root.newDataElement(EMVQR.TAG_MERCHANT_NAME, basicElements.merchantName);
      root.newDataElement(EMVQR.TAG_MERCHANT_CITY, basicElements.merchantCity);
      if (basicElements.oneTime) root.newDataElement(EMVQR.TAG_ONETIME_PAYMENT, '12');
      if (basicElements.transactionAmount) root.newDataElement(EMVQR.TAG_TRANSACTION_AMOUNT, basicElements.transactionAmount.toFixed(2));
    }

    return root;
  };

  EMVMerchantQRCode.parseCode = function parseCode(qrCode, params) {
    params = _extends({}, defaultParams, params);
    var root = new EMVMerchantQRCode(qrCode, params);

    function toTemplate(node, isIdentified, tag, lastTag) {
      for (var index = tag; index <= (lastTag != null ? lastTag : tag); ++index) {
        if (node.hasElement(index)) node.getElement(index).parseAsTemplate(isIdentified);
      }
    } // process MAI 26..51


    toTemplate(root, true, EMVQR.MAI_TEMPLATE_FIRST, EMVQR.MAI_TEMPLATE_LAST); // EL62 Additional Data Field Template

    if (root.hasElement(EMVQR.TAG_ADDITIONAL_DATA)) {
      toTemplate(root, false, EMVQR.TAG_ADDITIONAL_DATA); // Payment system specific .. child 50.99

      toTemplate(root.getElement(EMVQR.TAG_ADDITIONAL_DATA), true, 50, 99);
    } // EL64 = Language stuff


    toTemplate(root, false, 64); // EL80-99 =

    toTemplate(root, true, 80, 99);
    return root;
  };

  var _proto = EMVMerchantQRCode.prototype;

  _proto.getDataElement = function getDataElement(tag) {
    if (this.hasElement(tag)) {
      return this.getElement(tag).content;
    }

    return '';
  };

  _proto.extractElements = function extractElements() {
    var basicElements = {
      merchantCategoryCode: this.getDataElement(EMVQR.TAG_MCC),
      transactionCurrency: Number(+this.getDataElement(EMVQR.TAG_TRANSACTION_CURRENCY)),
      countryCode: this.getDataElement(EMVQR.TAG_COUNTRY_CODE),
      merchantName: this.getDataElement(EMVQR.TAG_MERCHANT_NAME),
      merchantCity: this.getDataElement(EMVQR.TAG_MERCHANT_CITY),
      transactionAmount: Number(+this.getDataElement(EMVQR.TAG_TRANSACTION_AMOUNT)),
      oneTime: this.getDataElement(EMVQR.TAG_ONETIME_PAYMENT) === '12'
    };
    return basicElements;
  }
  /*
   * Validate QR code by EMV Rules
   */
  ;

  _proto.validateCode =
  /*#__PURE__*/
  function () {
    var _validateCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(observer) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", getRuleValidator().validate(this, observer));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function validateCode(_x) {
      return _validateCode.apply(this, arguments);
    }

    return validateCode;
  }()
  /*
   * Rebuild string from QR Node structure, calculating correct CRC
   */
  ;

  _proto.buildQRString = function buildQRString() {
    var content = this.content; // "00" - first element in QR string

    content = this.ensureDataElement(0, '01').buildQRString(); // build rest (-00,-63) .. passing correct offset

    content += _QRCodeNode.prototype.buildQRString.call(this, content.length); // Recalculate CRC - tag "63" - last element in QR string
    // reset CRC with correct length and concat tag+length

    content += this.newDataElement(EMVQR.TAG_CRC, '0000').buildQRString(content.length).slice(0, -4); // Recalculate CRC .. upto to and including tag+length of "63"

    var crc = computeCRC(content);
    this.getElement(EMVQR.TAG_CRC).content = crc; // reset content

    this.baseOffset = 0;
    this.content = content = content + crc;
    return content;
  };

  _proto.dumpNode = function dumpNode(node, schema, indent) {
    var _this2 = this;

    if (node === void 0) {
      node = this;
    }

    var result = '';

    if (node.isType('data')) {
      result += indent + " " + ('00' + node.tag).slice(-2) + " (" + schema.name + ")\n";
      result += indent + " " + node.content + "\n";
    } else {
      if (!node.isType('root')) {
        result += indent + '(' + ('00' + node.tag).slice(-2) + '): ' + schema.name + '\n';
        indent += '  ';
      }

      node.elements.forEach(function (element) {
        var _schema$elementMap$el, _schema$elementMap;

        var nodeSchema = (_schema$elementMap$el = schema == null ? void 0 : (_schema$elementMap = schema.elementMap) == null ? void 0 : _schema$elementMap[element.tag]) != null ? _schema$elementMap$el : {
          name: 'unknown',
          elementMap: {}
        };
        result += _this2.dumpNode(element, nodeSchema, indent);
      });
    }

    return result;
  };

  return EMVMerchantQRCode;
}(QRCodeNode);

var PIXQRErrorCode;

(function (PIXQRErrorCode) {
  PIXQRErrorCode[PIXQRErrorCode["OK"] = 0] = "OK";
  PIXQRErrorCode[PIXQRErrorCode["INVALID_QRCODE"] = 1] = "INVALID_QRCODE";
  PIXQRErrorCode[PIXQRErrorCode["CRC_MISMATCH"] = 2] = "CRC_MISMATCH";
  PIXQRErrorCode[PIXQRErrorCode["MISSING_MANDATORY_ELEMENT"] = 3] = "MISSING_MANDATORY_ELEMENT";
  PIXQRErrorCode[PIXQRErrorCode["MISSING_PIX_MAI"] = 4] = "MISSING_PIX_MAI";
  PIXQRErrorCode[PIXQRErrorCode["PIX_MAI_INVALID"] = 5] = "PIX_MAI_INVALID";
  PIXQRErrorCode[PIXQRErrorCode["DUPLICATE_PIX_MAI"] = 6] = "DUPLICATE_PIX_MAI";
})(PIXQRErrorCode || (PIXQRErrorCode = {}));

var PIXQRCodeError = /*#__PURE__*/function (_ValidationError) {
  _inheritsLoose(PIXQRCodeError, _ValidationError);

  function PIXQRCodeError(errorCode, message) {
    var _this;

    _this = _ValidationError.call(this, errorCode, message) || this;
    _this.errorCode = void 0;
    _this.errorCode = errorCode;
    _this.errorName = 'PIXQR-' + PIXQRErrorCode[errorCode];
    return _this;
  }

  return PIXQRCodeError;
}(ValidationError);

function addStaticRules(v) {
  v.addRule({
    id: 'pix-static-txid',
    when: function when(pix) {
      return pix.isPIX('static');
    },
    description: 'Contains a PIX Merchant Account Information',
    rule: function rule() {// Nothing Here
    }
  });
}

function addDynamicRules(v) {
  v.addRule({
    id: 'pix-dynamic-txid',
    when: function when(pix) {
      return pix.isPIX('dynamic');
    },
    description: 'Correct URL coded in dynamic PIX',
    rule: function rule(pix) {
      var url = pix.getMAI().getElement(PIX.TAG_MAI_URL);
      if (url && url.content.startsWith('http')) throw new PIXQRCodeError(PIXQRErrorCode.PIX_MAI_INVALID, 'URL must not contain protocol (https://)');
    }
  });
}

function getRuleValidator$1() {
  var v = RuleValidator.get({
    id: 'PIXQR'
  }).addRule({
    id: 'pix-mai',
    description: 'Contains a PIX Merchant Account Information',
    rule: function rule(pix) {
      var maiList = pix.emvQRCode.findIdentifiedTemplate(PIX.GUI, 26, 51);

      if (maiList.length === 0) {
        throw new PIXQRCodeError(PIXQRErrorCode.MISSING_PIX_MAI, 'PIX MAI not found');
      }

      if (maiList.length > 1) {
        throw new PIXQRCodeError(PIXQRErrorCode.DUPLICATE_PIX_MAI, 'PIX MAI duplicated');
      }
    }
  }).addRule({
    id: 'pix-static-or-dynamic',
    description: 'Contains a PIX Merchant Account Information',
    rule: function rule(pix) {
      var pixMAI = pix.getMAI(); // 3. PIX-MAI contents must indicate CHAVE or URL

      var pixStatic = pixMAI.hasElement(PIX.TAG_MAI_CHAVE);

      if (pixStatic) {
        if (pixMAI.hasElement(PIX.TAG_MAI_URL)) {
          throw new PIXQRCodeError(PIXQRErrorCode.PIX_MAI_INVALID, 'PIX MAI contains both CHAVE and URL elements');
        }
      } else {
        // must be dynamic
        if (!pixMAI.hasElement(PIX.TAG_MAI_URL)) {
          throw new PIXQRCodeError(PIXQRErrorCode.PIX_MAI_INVALID, 'PIX MAI contains neither static or dynamic elements');
        }
      }
    }
  });
  addStaticRules(v);
  addDynamicRules(v);
  return v;
}

function toBase64(_x) {
  return _toBase.apply(this, arguments);
}

function _toBase() {
  _toBase = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(brCode) {
    var dataUrl;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return toDataURL(brCode);

          case 3:
            dataUrl = _context.sent;
            return _context.abrupt("return", dataUrl.toString());

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'Invalid input string');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _toBase.apply(this, arguments);
}

function toImage(_x2) {
  return _toImage.apply(this, arguments);
}

function _toImage() {
  _toImage = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(brCode) {
    var base64, matches;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return toBase64(brCode);

          case 2:
            base64 = _context2.sent;
            matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

            if (!(matches == null || matches.length !== 3)) {
              _context2.next = 6;
              break;
            }

            throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'Invalid input string');

          case 6:
            return _context2.abrupt("return", Buffer.from(matches[2], 'base64'));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _toImage.apply(this, arguments);
}

var PIX = function PIX() {};
PIX.GUI = 'br.gov.bcb.pix';
PIX.TAG_MAI_CHAVE = 1;
PIX.TAG_MAI_INFO_ADD = 2;
PIX.TAG_MAI_URL = 25;
var PIXQRCode = /*#__PURE__*/function () {
  function PIXQRCode(emvQRCode) {
    this.emvQRCode = void 0;
    this.emvQRCode = emvQRCode;
  }

  var _proto = PIXQRCode.prototype;

  _proto.getMAI = function getMAI() {
    var maiList = this.emvQRCode.findIdentifiedTemplate(PIX.GUI, EMVQR.MAI_TEMPLATE_FIRST, EMVQR.MAI_TEMPLATE_LAST);
    return maiList[0];
  };

  PIXQRCode.createCode = function createCode(elements) {
    var pixQRCode = new PIXQRCode(EMVMerchantQRCode.createCode(elements));
    var emvQRCode = pixQRCode.emvQRCode;
    var guiNode = new QRCodeNode('data', PIX.GUI, EMVQR.TAG_TEMPLATE_GUI);
    var maiPIX = emvQRCode.newTemplateElement(EMVQR.MAI_TEMPLATE_FIRST, EMVQR.MAI_TEMPLATE_LAST, true, [guiNode]);

    if (elements.type === 'static') {
      if (elements.chave) maiPIX.newDataElement(PIX.TAG_MAI_CHAVE, elements.chave);
      if (elements.infoAdicional) maiPIX.newDataElement(PIX.TAG_MAI_INFO_ADD, elements.infoAdicional);

      if (elements.txid) {
        var el62 = emvQRCode.newTemplateElement(EMVQR.TAG_ADDITIONAL_DATA);
        el62.newDataElement(EMVQR.TAG_AD_REF_LABEL, elements.txid);
      }
    } else {
      if (elements.url) maiPIX.newDataElement(PIX.TAG_MAI_URL, elements.url);
    }

    return pixQRCode;
  };

  PIXQRCode.parseCode = function parseCode(qrCode, params) {
    return new PIXQRCode(EMVMerchantQRCode.parseCode(qrCode, params));
  };

  _proto.validateCode = /*#__PURE__*/function () {
    var _validateCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(observer) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getRuleValidator$1().validate(this, observer);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function validateCode(_x) {
      return _validateCode.apply(this, arguments);
    }

    return validateCode;
  }();

  _proto.isPIX = function isPIX(test) {
    var pixMAI = this.getMAI();
    if (!pixMAI) return false;
    var isStatic = pixMAI.hasElement(PIX.TAG_MAI_CHAVE);
    var isDynamic = pixMAI.hasElement(PIX.TAG_MAI_URL);

    switch (test) {
      case 'pix':
        return true;

      case 'valid':
        return isStatic || isDynamic;

      case 'static':
        return isStatic;

      case 'dynamic':
        return isDynamic;

      default:
        return false;
    }
  };

  _proto.extractElements = function extractElements() {
    var emvQR = this.emvQRCode;
    var basicElements = emvQR.extractElements();

    if (this.isPIX('static')) {
      var _this$getMAI, _this$getMAI2, _emvQR$getElement, _emvQR$getElement$get;

      return _extends({
        type: 'static'
      }, basicElements, {
        chave: (_this$getMAI = this.getMAI()) == null ? void 0 : _this$getMAI.getElement(PIX.TAG_MAI_CHAVE).content,
        infoAdicional: (_this$getMAI2 = this.getMAI()) == null ? void 0 : _this$getMAI2.getElement(PIX.TAG_MAI_INFO_ADD).content,
        txid: (_emvQR$getElement = emvQR.getElement(EMVQR.TAG_ADDITIONAL_DATA)) == null ? void 0 : (_emvQR$getElement$get = _emvQR$getElement.getElement(EMVQR.TAG_AD_REF_LABEL)) == null ? void 0 : _emvQR$getElement$get.content
      });
    } else if (this.isPIX('dynamic')) {
      var _this$getMAI3;

      return _extends({
        type: 'dynamic'
      }, basicElements, {
        url: (_this$getMAI3 = this.getMAI()) == null ? void 0 : _this$getMAI3.getElement(PIX.TAG_MAI_URL).content
      });
    }

    throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'Unable to extract static/dynamic elements');
  };

  PIXQRCode.getImage = /*#__PURE__*/function () {
    var _getImage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(brCode) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", toBase64(brCode));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getImage(_x2) {
      return _getImage.apply(this, arguments);
    }

    return getImage;
  }();

  PIXQRCode.getBase64Image = /*#__PURE__*/function () {
    var _getBase64Image = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(brCode) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", toImage(brCode));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getBase64Image(_x3) {
      return _getBase64Image.apply(this, arguments);
    }

    return getBase64Image;
  }();

  _proto.getPayloadData = /*#__PURE__*/function () {
    var _getPayloadData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(params) {
      var _this$getMAI4;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.isPIX('dynamic')) {
                _context4.next = 2;
                break;
              }

              throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'You can only get payload data from dynamic pix');

            case 2:
              return _context4.abrupt("return", fetchPayload(_extends({
                url: (_this$getMAI4 = this.getMAI()) == null ? void 0 : _this$getMAI4.getElement(PIX.TAG_MAI_URL).content
              }, params)));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getPayloadData(_x4) {
      return _getPayloadData.apply(this, arguments);
    }

    return getPayloadData;
  }();

  return PIXQRCode;
}();

var PixDynamicStatus;

(function (PixDynamicStatus) {
  PixDynamicStatus["ATIVA"] = "ATIVA";
  PixDynamicStatus["CONCLUIDA"] = "CONCLUIDA";
  PixDynamicStatus["REMOVIDA_PELO_USUARIO_RECEBEDOR"] = "REMOVIDA_PELO_USUARIO_RECEBEDOR";
  PixDynamicStatus["REMOVIDA_PELO_PSP"] = "REMOVIDA_PELO_PSP";
})(PixDynamicStatus || (PixDynamicStatus = {}));

var PayloadExample = {
  txid: 'fc9a4366-ff3d-4964-b5db-c6c91a8722d3',
  revisao: 3,
  calendario: {
    criacao: '2020-09-15T19:39:54.013Z',
    apresentacao: '2020-04-01T18:00:00Z',
    expiracao: 3600
  },
  status: PixDynamicStatus.ATIVA,
  valor: {
    original: '500.00',
    "final": '500.00',
    modalidadeAlteracao: 0
  },
  chave: '7407c9c8-f78b-11ea-adc1-0242ac120002',
  solicitacaoPagador: 'Informar cartão fidelidade',
  infoAdicionais: [{
    nome: 'quantidade',
    valor: '2'
  }]
};

export default PIXQRCode;
export { PIX, PIXQRCode, PayloadExample, PixDynamicStatus };
//# sourceMappingURL=pix-utils.esm.js.map
