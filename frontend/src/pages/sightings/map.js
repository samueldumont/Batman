import {
    ReactBingmaps
} from 'react-bingmaps';
import React from 'react'
import Map from '../../components/MapContainer'
import axios from 'axios'
import Layout from '../../components/layout'
import { Avatar, Card, Row, Col, Statistic, Icon, Steps } from 'antd'

import { Typography } from 'antd'

const { Title } = Typography
const { Meta } = Card


export default class extends React.Component {
    state = { isLoading: true }


    async componentDidMount() {
        this.setState({ isLoading: true })
        const backendData = await axios.get(`http://batman-backend-hitw.westeurope.azurecontainer.io/releves`)

        const locations = []

        backendData.data.forEach(function (element) {
            locations.push({ "observationAmount": element["observationAmount"], "locationCoordinates": element["locationCoordinates"] })
        })

        this.setState({
            ...this.state,
            isLoading: false,
            sightings: locations
        })
    }

    render() {
        if (this.state.isLoading) return null
        else return (
            <div>
                <Layout>
                    <Title>Sightings</Title>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                    </div>
                </Layout>
                <Card
                    style={{ width: 800 }}
                    cover={<div style={{ height: '600px' }}>
                        <Map mapStyle={{ height: '600px', width: '1000px' }} zoom={8} location={{ lat: 50.379720, lng: 5.523351 }} pushPins={this.state.sightings} />
                    </div>}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/profile-lipo-glyph/64/profile_user_character-29-512.png " />}
                        title="Batman"
                        description="Really enjoyed my time with the bats. Rated 7 stars out of 5."
                    />
                </Card>
            </div >
        )
    }

}     
