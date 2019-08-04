import React from 'react'
import Layout from '../../components/layout'
import { Avatar, Card, Row, Col, Statistic, Icon, Steps } from 'antd'
import { Typography } from 'antd'
import 'antd/dist/antd.css' 
import '../../styles/global.css'
import building from '../images/building.png'
import forest from '../images/forest.png'
import moon from '../images/moon.png'
import temperature from '../images/temperature.png'
import sunny from '../images/sunny.png'
import BarChart from '../../components/barchart'
import axios from 'axios'
import Map from '../../components/MapContainer'
const { Title } = Typography
const { Step } = Steps
const { Meta } = Card

export default class extends React.Component {
    state = {} 

    async componentDidMount() {
        const hashValue = window.location.hash.split('#')
        const id = hashValue[hashValue.length - 1]

        const backendData = await axios.get(`http://batman-backend-hitw.westeurope.azurecontainer.io/releves/${id}`)
        console.log(backendData)

        this.setState(backendData.data) 
    }

    toTitleCase = str => {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    render() {
        console.log(this.state)
        const { observationAmount, height, startDate, locationName, maintenanceType, primaryStructuringElementType, secondaryStructuringElementType, weatherType, microphoneNumber, isIlluminated, habitatType  } = this.state
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
                        <Card style={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: '1rem' }}>
                            <Row style={{ flex: 1, marginBottom: '5rem' }} type='flex' gutter={20}>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Number of observations" value={observationAmount} suffix='recordings' />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Primary Structuring Element" value={primaryStructuringElementType} />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Maintenance" value={maintenanceType} />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Height" value={height} suffix='cm' />
                                </Col>
                            </Row>
                            <Row style={{ flex: 1 }} type='flex' gutter={20}>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Date" value={startDate} />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Location" value={locationName} />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Habitat" value={habitatType} />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Statistic title="Illuminated" value={isIlluminated} />
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            style={{ width: 350 }}
                            cover={<div style={{ height: '350px' }}>
                                <Map mapStyle={{ height: '350px', width: '350px' }} location={{ lat: 50.606962, lng: 3.511842 }} />
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
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', backgroundColor: 'rgba(166,176,98, 0.3)' }}>
                    <div className='main-layout' style={{ display: 'flex', flex: 1, marginTop: 0 }}>
                        <Card style={{ height: '200px', display: 'flex', flex: 1, backgroundColor: 'rgba(166,176,98, 0.3)', justifyContent: 'center', paddingTop: '1rem', alignItems: 'center', flexDirection: 'column', marginRight: '1rem' }}>
                            <img src={temperature} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='temperature' />
                            <div style={{display: 'flex', justifyContent: 'center'}}><span>{'10-15 °C'}</span></div>
                        </Card>
                        <Card style={{ height: '200px', display: 'flex', flex: 1, backgroundColor: 'rgba(166,176,98, 0.3)', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: '1rem' }}>
                            <img src={weatherType === 'nuit calme' ? moon : sunny} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='sunny' />
                            <div style={{display: 'flex', justifyContent: 'center'}}><span>{weatherType && this.toTitleCase(weatherType)}</span></div>
                        </Card>
                        <Card style={{ height: '200px', display: 'flex', width: '350px', backgroundColor: 'rgba(166,176,98, 0.3)', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={habitatType === 'Bâtiments' ? building : forest} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='forest' />
                            <div style={{display: 'flex', justifyContent: 'center'}}><span>{habitatType}</span></div>
                        </Card>
                    </div>
                </div>
                <div className='main-layout' style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ flex: 1, display: 'flex' }}>
                        <BarChart />
                    </Card>
                </div>
            </div >
        )
    }

}               
