import React from 'react'
import { Modal, Button, Form, Select } from 'semantic-ui-react'

import priorityList from '../data/priority'
import _ from 'lodash'

const ModalTask = (params) => {
    const { show, handleClose, handleOpen, handleChange, handleSubmit, priority, subject } = params

    return (
        <Modal
            onClose={() => handleClose()}
            onOpen={() => handleOpen()}
            open={show}
        >
            <Modal.Header>Новая задача</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Заголовок</label>
                        <Form.Input
                            placeholder='Заголовок задачи'
                            value={subject}
                            name='taskSubject'
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Приоритет задачи</label>
                        <Select
                            placeholder='Приоритет задачи'
                            options={priorityList}
                            name='taskPriority'
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={() => handleClose()}>
                    Отменить
                </Button>
                <Button
                    content="Добавить задачу"
                    labelPosition='right'
                    icon='checkmark'
                    disabled={_.isEmpty(subject) || _.isEmpty(priority)}
                    onClick={() => handleSubmit()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default ModalTask