import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SignInForm from "../components/signInComponents/signInForm"
import "../assets/styles/signIn.css"

const SignInPage: React.FC = () => {
	return (
		<section className="background-radial-gradient overflow-hidden  d-flex justify-content-center align-items-center">
			<Container className="px-4 py-5 px-md-5 text-center text-lg-start my-5">
				<Row className="gx-lg-5 align-items-center mb-5">
					<Col lg={6} className="mb-5 mb-lg-0" style={{ zIndex: 10 }}>
						<img
							src="images/steps.png"
							alt="..."
							className="img-fluid"
							width={"80%"}
							height={"80%"}
						/>
					</Col>

					<Col
						lg={6}
						className="mb-5 mb-lg-0 position-relative d-flex justify-content-center align-items-center"
					>
						<div
							id="radius-shape-1"
							className="position-absolute rounded-circle shadow-5-strong"
						></div>
						<div
							id="radius-shape-2"
							className="position-absolute shadow-5-strong"
						></div>
						<SignInForm />
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default SignInPage
