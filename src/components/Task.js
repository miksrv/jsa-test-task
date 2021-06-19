import React, { Component } from 'react'
import { Container, Segment, Dimmer, Loader, Label } from 'semantic-ui-react'

import Header from '../layout/Header'
import Footer from '../layout/Footer'

import tasks from '../data/tasks'
import getPriority from '../data/getPriority'

import _ from 'lodash'

class Task extends Component {
    state = {
        taskList: []
    }

    componentDidMount() {
        let taskList = localStorage.getItem('taskList')

        if (taskList == null) {
            taskList = tasks
            localStorage.setItem('taskList', JSON.stringify(taskList))
        } else {
            taskList = JSON.parse(taskList)
        }

        this.setState({taskList})
    }

    render() {
        const { id } = this.props.match.params
        const { taskList } = this.state

        let foundIndex = taskList.findIndex(x => x.id == id)
        let priority = {c: null, t: null}

        if (foundIndex !== -1) {
            priority = getPriority(taskList[foundIndex].priority)
        }

        return (
            <Container>
                <Header
                    isAdmin={null}
                />
                {(foundIndex === -1) ? (
                    <Segment className='segment-loader'>
                        <Dimmer active inverted>
                            <Loader />
                        </Dimmer>
                    </Segment>
                ) : (
                    <Segment color={priority.c} className={'task-item' + (!taskList[foundIndex].open ? ' completed' : '')}>
                        <div className='content'>
                            <div>
                                <Label color={priority.c}>{priority.t}</Label>
                            </div>
                            {(taskList[foundIndex].open) && (<div><Label basic>Открыто</Label></div>)}
                            <div className='date small'>{taskList[foundIndex].date}</div>
                            <div>
                                <div>{taskList[foundIndex].subject}</div>
                            </div>
                        </div>
                        {!_.isEmpty(taskList[foundIndex].comments) && (
                            <div className='comments'>
                                {taskList[foundIndex].comments.map((item, key) => {
                                    return (
                                        <div key={key}>{item}</div>
                                    )
                                })}
                            </div>
                        )}
                    </Segment>
                )}

                <Footer />
            </Container>
        )
    }
}

export default Task