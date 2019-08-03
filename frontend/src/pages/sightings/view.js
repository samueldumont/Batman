import React from 'react'
import Layout from '../../components/layout'
import { Avatar, Descriptions, Icon, Steps } from 'antd'
import { Typography } from 'antd'

const { Title } = Typography
const { Step } = Steps
export default () => {
    return (
        <div>
            <Layout>
                <div style={{ marginBottom: '4rem' }}>
                    <Steps>
                        <Step status="finish" title="Metadata Uploaded" icon={<Icon type="user" />} />
                        <Step status="finish" title="Sighting Completed" icon={<Icon type="solution" />} />
                        <Step status="wait" title="Sound Analysis Completed" icon={<Icon type="smile-o" />} />
                    </Steps>
                </div>
                <Title>Sighting #123</Title>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Descriptions title="User Info">
                            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <Avatar shape="square" size={256} icon="user" />
                </div>
            </Layout>
            <div style={{ backgroundColor: '#efefef'}}>
                <div className='main-layout' style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ flex: 1, display: 'flex', height: '250px', justifyContent: 'center', alignItems: 'space-between', flexDirection: 'column' }}>
                        <img src={'../temperature.png'} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='hot' />
                        <div>25C</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img src={'../sunny.png'} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='sunny' />
                        <div><span style={{ textAlign: 'center' }}>Mostly sunny</span></div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img src={'../forest.png'} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='forest' />
                        <div><span style={{ textAlign: 'center' }}>Forest environment</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}               