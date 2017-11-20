const { createStore, applyMiddleware, compose } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { composeWithDevTools } = require('remote-redux-devtools');
const reducers = require('./reducers');
const effects = require('./effects');

module.exports = ({ debug }) => {
    const composeEnhancers = debug ? composeWithDevTools({
        port: 8000,
        realtime: true
    }) : compose;

    const saga = createSagaMiddleware();

    const store = createStore(reducers,
        composeEnhancers(
            applyMiddleware(saga)
        )
    );

    effects.forEach(effect => saga.run(effect));

    return store;
};
