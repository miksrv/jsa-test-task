import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'

import _ from 'lodash'

const ModalComment = (params) => {
    const { show, text, handleClose, handleOpen, handleChange, handleSubmit } = params

    return (
        <Modal
            onClose={() => handleClose()}
            onOpen={() => handleOpen()}
            open={show}
        >
            <Modal.Header>Добавить комментарий к задаче</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.TextArea
                        onChange={(e, { value }) => handleChange(value)}
                        placeholder='Напишите все то, о чем думаете...'
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={() => handleClose()}>
                    Отменить
                </Button>
                <Button
                    content="Оставить комментарий"
                    labelPosition='right'
                    icon='checkmark'
                    disabled={_.isEmpty(text)}
                    onClick={() => handleSubmit()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default ModalComment