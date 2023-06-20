'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {

    if (typeof executor !== 'function')
        throw new TypeError('executor must be a function')

    this._state = 'pending';
    this._handlerGroups = [];
    this._value;


    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
};

$Promise.prototype._internalResolve = function (value) {
    // Implementación del método _internalResolve
    if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = value;
        this._callHandlers();
    };
};

$Promise.prototype._internalReject = function (reason) {
    // Implementación del método _internalReject
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = reason;
        this._callHandlers();

    };
};

$Promise.prototype.then = function (successCb, errorCb) {

    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;

    const downstreamPromise = new $Promise(() => { })

    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    })
    if (this._state !== 'pending') this._callHandlers();

    return downstreamPromise;

};

$Promise.prototype._callHandlers = function () {

    while (this._handlerGroups.length) {

        let handler = this._handlerGroups.shift();

        if (this._state === 'fulfilled') {
            if (handler.successCb) {
                try {
                    const result = handler.successCb(this._value);
                    if (result instanceof $Promise) {
                        return result.then(
                            value => handler.downstreamPromise._internalResolve(value),
                            reason => handler.downstreamPromise._internalReject(reason));
                    } else {
                        handler.downstreamPromise._internalResolve(result);
                    }
                } catch (error) {
                    handler.downstreamPromise._internalReject(error);
                }
            } else {
                handler.downstreamPromise._internalResolve(this._value);
            }
        } else if (this._state === 'rejected') {
            if (handler.errorCb) {
                try {
                    const result = handler.errorCb(this._value);
                    if (result instanceof $Promise) {
                        return result.then(
                            value => handler.downstreamPromise._internalResolve(value),
                            reason => handler.downstreamPromise._internalReject(reason));
                    } else {
                        handler.downstreamPromise._internalResolve(result);
                    }
                } catch (error) {
                    handler.downstreamPromise._internalReject(error);
                }
            } else {
                return handler.downstreamPromise._internalReject(this._value);
            }
        }

    };
};

$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb)
};

$Promise.resolve = function (value) {
    if (value instanceof $Promise) {
        return value;
    }

    return new $Promise(function (resolve) {
        resolve(value);
    });
};

$Promise.all = (promises) => {
    if (!Array.isArray(promises)) {
        throw new TypeError('promises must be an array');
    }

    return new $Promise((resolve, reject) => {
        const results = [];
        let fulfilledCount = 0;

        promises.forEach((promise, index) => {
            if (!(promise instanceof $Promise)) {
                promise = $Promise.resolve(promise);
            }

            promise.then(
                (value) => {
                    results[index] = value;
                    fulfilledCount++;
                    if (fulfilledCount === promises.length) resolve(results);
                },
                (reason) => reject(reason)
            );
        });
    });
};


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
