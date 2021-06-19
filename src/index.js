import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'moment/locale/ru'
import 'semantic-ui-css/semantic.min.css'
import './static/css/main.sass'

import Main from './components/Main'
import Task from './components/Task'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/task/:id" component={Task} />
                <Route component={Main} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)