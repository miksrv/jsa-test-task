import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import TaskList from '../layout/TaskList'

import ModalComment from '../layout/ModalComment'
import ModalTask from '../layout/ModalTask'

import moment from 'moment'
import tasks from '../data/tasks'

class Main extends Component {
    state = {
        isAdmin: true,
        taskList: [],

        commentModal: false,
        commentText: null,
        commentTaskID: null,

        taskModal: false,
        taskPriority: null,
        taskSubject: null
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

    onChangeRole = (isAdmin) => {
        this.setState({isAdmin})
    }

    onChangeStatus = (id, open) => {
        const { taskList } = this.state

        let foundIndex = taskList.findIndex(x => x.id == id)

        taskList[foundIndex].open = ! open

        this.setState({taskList})

        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

    onChangePriority = (id, priority) => {
        const { taskList } = this.state

        let foundIndex = taskList.findIndex(x => x.id == id)

        taskList[foundIndex].priority = priority

        this.setState({taskList})

        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

    onCommentSubmit = () => {
        const { taskList, commentTaskID, commentText } = this.state

        let foundIndex   = taskList.findIndex(x => x.id == commentTaskID),
            commentsList = taskList[foundIndex].comments

        commentsList.push(commentText)

        this.setState({taskList})
        this.closeCommentModal()

        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

    onCommentChange = value => {
        this.setState({commentText: value})
    }

    openCommentModal = (taskID) => {
        this.setState({commentModal: true, commentTaskID: taskID})
    }

    onTaskChange = (e, { name, value }) => this.setState({ [name]: value })

    onTaskSubmit = () => {
        const { taskList, taskSubject, taskPriority } = this.state

        let lastTask = taskList.slice(-1).pop()


        let newTask = {
            id: lastTask.id + 1,
            priority: taskPriority,
            open: true,
            date: moment().format('DD.MM.YYYY H:m'),
            subject: taskSubject,
            comments: []
        }

        taskList.push(newTask)

        this.setState({taskList})
        this.closeTaskModal()

        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

    closeCommentModal = () => {
        this.setState({commentModal: false, commentTaskID: null})
    }

    openTaskModal = (taskID) => {
        this.setState({taskModal: true})
    }

    closeTaskModal = () => {
        this.setState({taskModal: false})
    }

    render() {
        const {
            isAdmin, taskList,
            commentText, commentModal,
            taskModal, taskPriority, taskSubject
        } = this.state

        return (
            <Container>
                <Header
                    isAdmin={isAdmin}
                    handlerChangeRole={admin => this.onChangeRole(admin)}
                    handlerOpenTask={() => this.openTaskModal()}
                />
                <TaskList
                    isAdmin={isAdmin}
                    list={taskList}
                    handleChangeStatus={(id, open) => this.onChangeStatus(id, open)}
                    handleChangePriority={(id, priority) => this.onChangePriority(id, priority)}
                    handleComment={id => this.openCommentModal(id)}
                />
                <Footer />
                <ModalComment
                    handleClose={() => this.closeCommentModal()}
                    handleOpen={() => this.openCommentModal(null)}
                    handleChange={value => this.onCommentChange(value)}
                    handleSubmit={() => this.onCommentSubmit()}
                    text={commentText}
                    show={commentModal}
                />
                <ModalTask
                    handleClose={() => this.closeTaskModal()}
                    handleOpen={() => this.openTaskModal()}
                    handleChange={this.onTaskChange}
                    handleSubmit={() => this.onTaskSubmit()}
                    priority={taskPriority}
                    subject={taskSubject}
                    show={taskModal}
                />
            </Container>
        )
    }
}

export default Main