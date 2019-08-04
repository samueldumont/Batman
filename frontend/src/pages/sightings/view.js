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
import { Tabs } from 'antd';
import moment from 'moment'

const { TabPane } = Tabs;
const { Step } = Steps
const { Meta } = Card

export default class extends React.Component {
    state = { locationCoordinates: { lat: 0, lng: 0 } }

    async componentDidMount() {
        this.setState({ isLoading: true })
        const hashValue = window.location.hash.split('#')
        const id = hashValue[hashValue.length - 1]

        const backendData = await axios.get(`http://batman-backend-hitw.westeurope.azurecontainer.io/releves/${id}`)
        console.log(backendData)

        const date = moment(backendData.data.startDate, "YYYYMMDD").format("Do MMM YYYY")


        this.setState({ ...backendData.data, date, isLoading: false })
    }

    toTitleCase = str => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    render() {
        console.log(this.state)
        const { observationAmount, height, deviceNumber, startDate, locationName, maintenanceType, primaryStructuringElementType, secondaryStructuringElementType, weatherType, microphoneNumber, isIlluminated, habitatType, date, locationCoordinates } = this.state
        if (this.state.isLoading) return null
        else return (
            <div>
                <Layout>
                    <div style={{ marginBottom: '1rem' }}>
                        <Steps>
                            <Step status="finish" title="Metadonnées Uploadées" icon={<Icon type="user" />} />
                            <Step status="finish" title="Observation validée" icon={<Icon type="solution" />} />
                            <Step status="wait" title="Analyse effectuée" icon={<Icon type="smile-o" />} />
                        </Steps>
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Statistiques" key="1">
                                <Card className='statistix' style={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: '1rem' }}>
                                    <Row style={{ flex: 1, marginBottom: '2rem', marginLeft: 0, marginRight: 0 }} type='flex' gutter={20}>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6}>
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Nombre d'observations" value={observationAmount} suffix='recordings' />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6} >
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Elément structurant principal" value={primaryStructuringElementType} />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6} >
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Gestion" value={maintenanceType} />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingRight: 0, paddingLeft: 0 }} span={6} >
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Hauteur de pose" value={height} suffix='cm' />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ flex: 1, marginLeft: 0, marginRight: 0 }} type='flex' gutter={20}>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6}>
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Date" value={date} />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6}>
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Emplacement" value={locationName} />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingLeft: 0 }} span={6}>
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Eclairage" value={isIlluminated} />
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" style={{ paddingLeft: 0, paddingRight: 0 }} span={6}>
                                            <div className='cardbox cardbox-1'>
                                                <Statistic title="Numero du boitier" value={deviceNumber} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </TabPane>
                            <TabPane tab="Graph" key="2">
                                <Card style={{ flex: 1, display: 'flex' }}>
                                    <BarChart />
                                </Card>
                            </TabPane>
                        </Tabs>

                        <Card
                            style={{ width: 350, marginTop: '3.8rem' }}
                            cover={<div style={{ height: '350px' }}>
                                <Map mapStyle={{ height: '350px', width: '350px' }} location={locationCoordinates} />
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
                            <div style={{ display: 'flex', justifyContent: 'center' }}><span>{'10-15 °C'}</span></div>
                        </Card>
                        <Card style={{ height: '200px', display: 'flex', flex: 1, backgroundColor: 'rgba(166,176,98, 0.3)', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: '1rem' }}>
                            <img src={weatherType === 'nuit calme' ? moon : sunny} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='sunny' />
                            <div style={{ display: 'flex', justifyContent: 'center' }}><span>{weatherType && this.toTitleCase(weatherType)}</span></div>
                        </Card>
                        <Card style={{ height: '200px', display: 'flex', width: '350px', backgroundColor: 'rgba(166,176,98, 0.3)', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={habitatType === 'Bâtiments' ? building : forest} style={{ height: 128, width: 'auto', marginBottom: '1rem' }} alt='forest' />
                            <div style={{ display: 'flex', justifyContent: 'center' }}><span>{habitatType}</span></div>
                        </Card>
                    </div>
                </div>
                <div className='main-layout' style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                </div>
            </div >
        )
    }

}               
