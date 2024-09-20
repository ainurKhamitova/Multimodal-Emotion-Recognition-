import React from "react"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import UserInfo from "../components/profileComponens/UserInfo"
import VideoUpload from "../components/profileComponens/VideoUpload"
import EmotionChartContainer from "../components/profileComponens/EmotionChartContainer"
import "../assets/styles/profile.css"
const ProfilePage: React.FC = () => {
	return (
		<section className="h-100 gradient-custom-2">
			<Container fluid className="py-5 h-100">
				<Row className="d-flex justify-content-center align-items-center h-100">
					<Col lg={9} xl={7}>
						<Card>
							<UserInfo />
							<VideoUpload />
							<EmotionChartContainer />
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default ProfilePage
