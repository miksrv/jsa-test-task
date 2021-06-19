import React from 'react'
import { Segment, Label, Checkbox, Dropdown } from 'semantic-ui-react'

import priorityList from '../data/priority'
import getPriority from '../data/getPriority'
import _ from 'lodash'

const TaskItem = (params) => {

    const { id, open, date, subject, comments } = params.data

    const priority = getPriority(params.data.priority)

    return (
        <Segment color={priority.c} className={'task-item' + (!open ? ' completed' : '')}>
            <div className='content'>
                <div>
                    <Checkbox
                        checked={!open}
                        onChange={() => params.handleChangeStatus(id, open)}
                    />
                </div>
                <div>
                    <Label color={priority.c}>{priority.t}</Label>
                </div>
                {(open) && (<div><Label basic>Открыто</Label></div>)}
                <div className='date small'>{date}</div>
                <div>
                    <div>
                        <a href={`/task/${id}`} title='' target='_blank' rel='noreferrer'>{subject}</a>
                    </div>
                    {open && (
                        <>
                            <Dropdown
                                text='Приоритет'
                                className='priority-button'
                                options={priorityList}
                                onChange={(v, k) => params.handleChangePriority(id, k.value)}
                            />
                            <span
                                className='comment-button'
                                onClick={() => params.handleComment(id)}
                            >
                                комментировать
                            </span>
                        </>
                    )}
                </div>
            </div>
            {!_.isEmpty(comments) && (
                <div className='comments'>
                    {comments.map((item, key) => {
                        return (
                            <div key={key}>{item}</div>
                        )
                    })}
                </div>
            )}
        </Segment>
    )
}

export default TaskItem