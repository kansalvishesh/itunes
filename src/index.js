import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from "redux-thunk";
import Home from './container/home';
import reducer from './entities/itunes/reducer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'antd/dist/antd.css';
import KnowMore from './container/knowmore';


const store = createStore(reducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/collection/:myTitlename" component={KnowMore} />
                <Route exact path="/" component={Home} />
            </div>
        </Router>
     </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
