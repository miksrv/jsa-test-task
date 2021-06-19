import React from 'react'

import { Menu, Image, Dropdown, Button } from 'semantic-ui-react'
import logo from '../static/img/logo.png'

const Header = (params) => {
    const { isAdmin, handlerChangeRole, handlerOpenTask } = params
    const userRoles = [
        {
            admin: false,
            name: 'Пользователь',
            active: !isAdmin
        },
        {
            admin: true,
            name: 'Администратор',
            active: isAdmin
        }
    ]

    return (
        <div text className='header'>
            <Menu
                borderless
            >
                <Menu.Item className='logo'>
                    <Image size='mini' src={logo} />
                </Menu.Item>
                <Menu.Item header className='title'>Список задач</Menu.Item>
                {(isAdmin !== null) && (
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button
                                color='green'
                                onClick={() => handlerOpenTask()}
                            >
                                Добавить задачу
                            </Button>
                        </Menu.Item>
                        <Dropdown text='Переключение роли' pointing className='link item'>
                            <Dropdown.Menu>
                                {userRoles.map((item, key) => {
                                    return (
                                        <Dropdown.Item
                                            selected={item.active}
                                            active={item.active}
                                            onClick={() => handlerChangeRole(item.admin)}
                                        >
                                            {item.name}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                )}
            </Menu>
        </div>
    )
}

export default Header