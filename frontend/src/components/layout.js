import React from 'react'
import logo from './logo.png'
import gradient from './gradient.png'

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
                <div style={{ flex: 1 }}>
                    <img src={gradient} style={{ height: 40, width: '100%' }} />
                </div>
                <div className='main-layout'>
                    {this.props.children}
                </div>
                <div style={{ flex: 1 }}>
                    <img src={gradient} style={{ height: 40, width: '100%' }} />
                </div>
            </div>
        )
    }
}

