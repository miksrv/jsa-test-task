import React from 'react'

import TaskItem from './TaskItem'

import _ from 'lodash'

const TaskList = (params) => {
    const { isAdmin, list, handleChangeStatus, handleChangePriority, handleComment } = params

    return (
        (!_.isEmpty(list)) ? (
            list.filter(item => isAdmin || item.priority === 'low')
            .map((item, key) => {
                return (
                    <TaskItem
                        key={key}
                        data={item}
                        handleChangeStatus={(id, open) => handleChangeStatus(id, open)}
                        handleChangePriority={(id, priority) => handleChangePriority(id, priority)}
                        handleComment={id => handleComment(id)}
                    />
                )
            })
        ) : (
            <div>Пока ничего нет</div>
        )
    )
}

export default TaskList