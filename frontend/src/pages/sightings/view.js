import React from 'react'
import Layout from '../../components/layout'
import { Avatar, Card, Row, Col, Statistic, Icon, Steps } from 'antd'
import { Typography } from 'antd'
import 'antd/dist/antd.css'
import '../../styles/global.css'
import forest from '../images/forest.png'
import temperature from '../images/temperature.png'
import sunny from '../images/sunny.png'

import Map from '../../components/MapContainer'

const { Title } = Typography
const { Step } = Steps
const { Meta } = Card

export default () => {
    return (
        <div>
            <Layout>
                <Title>Sighting #123</Title>
                <div style={{ marginBottom: '2rem' }}>
                    <Steps>
                        <Step status="finish" title="Metadata Uploaded" icon={<Icon type="user" />} />
                        <Step status="finish" title="Sighting Completed" icon={<Icon type="solution" />} />
                        <Step status="wait" title="Sound Analysis Completed" icon={<Icon type="smile-o" />} />
                    </Steps>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <Row style={{ flex: 1 }} type='flex' gutter={20}>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Number of observations" value={249} suffix='recordings' />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Primary Structuring Element" value={'Bande boisée et alignement d\'arbre'} />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Maintenance" value={'prairie - site pâturé (avec animaux présents)'} />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Height" value={'150'} suffix='cm' />
                            </Col>
                        </Row>
                        <Row style={{ flex: 1 }} type='flex' gutter={20}>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Date" value={'01/08/2019'} />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Location" value={'Eprave - Au pècheron'} />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Habitat" value={'Cours d\'eau - ruisseau (L < 3m)'} />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Statistic title="Illuminated" value={'no'} />
                            </Col>
                        </Row>
                    </div>

                    <Card
                        style={{ width: 350 }}
                        cover={<div style={{ height: '350px' }}>
                            <Map mapStyle={{ height: '350px', width: '350px'}} location={{ lat: 50.606962, lng: 3.511842 }} />s
                        </div>}
                        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                        <Meta
                        avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/profile-lipo-glyph/64/profile_user_character-29-512.png " />}
                        title="Batman"
                        description="Really enjoyed my time with the bats. Rated 7 stars out of 5."
                    />
                    </Card>


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
           
        </div >
    )
}               