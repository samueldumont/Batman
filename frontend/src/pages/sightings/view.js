import React from 'react'
import Layout from '../../components/layout'
import { Avatar, Descriptions, Icon, Steps } from 'antd'
import { Typography } from 'antd'
import 'antd/dist/antd.css'
import '../../styles/global.css'
import forest from '../images/forest.png'
import temperature from '../images/temperature.png'
import sunny from '../images/sunny.png'
import { ReactBingmaps } from 'react-bingmaps';

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
                        <Descriptions title="General Info">
                            <Descriptions.Item label="Device ID">B1-Dinant</Descriptions.Item>
                            <Descriptions.Item label="Microphone ID">MDNF/2</Descriptions.Item>
                            <Descriptions.Item label="Date">HsgittartDate</Descriptions.Item>
                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div style={{ height: '350px', width: '350px' }}>
                        <ReactBingmaps bingmapKey="AgUP2Ggx3ggz9rMkWlfOIZ2TzuPJv2wJsrikjmLpxqNb1rc_sBYy4I_hwq8R7cnX" center={[13.0827, 80.2707]}> </ReactBingmaps>
                    </div>
                </div>
            </Layout>
            <div style={{ backgroundColor: '#efefef' }}>
                <div className='main-layout' style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>    
                        <img src={temperature} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='hot' />
                        <div>25C</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img src={sunny} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='sunny' />
                        <div><span style={{ textAlign: 'center' }}>Mostly sunny</span></div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: '200px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <img src={forest} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='forest' />
                        <div><span style={{ textAlign: 'center' }}>Forest environment</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}               