import React from 'react'
import { Menu, Icon } from 'antd'

export default class extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        })
    }

    render() {
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="mail">
                        <Icon type="mail" />Navigation One
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="appstore" />
                        Navigation Two
                    </Menu.Item>
                </Menu>
                <div style={{ flex: 1 }}>
                    <img src={'../logo.png'} style={{ paddingLeft: '2rem', paddingTop: '1rem', paddingBottom: '1rem' }} alt='logo' />
                    <img src={'../gradient.png'} style={{ height: 150, width: '100%' }} />
                </div>
                <div className='main-layout'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

