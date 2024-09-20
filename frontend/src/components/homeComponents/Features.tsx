import { Container, Row, Col } from "react-bootstrap"
import FeatureCard from "./FeatureCard"
import featuresData from "../../feauteresData"
import { FC } from "react"

const Features: FC = () => {
	return (
		<Container className="features">
			<Row>
				<Col md={6} sm={12} className="pt-5">
					<Row>
						<Col sm={12} className="text-center">
							<h3 className="text-center feauteres-header">
								Empower Your Experience with{" "}
								<span className="features-header">
									{" "}
									Multimodal Emotion Recognition Excellence.{" "}
								</span>
							</h3>
						</Col>
						<Col sm={12} className=" pt-3 d-flex justify-content-center">
							<h6 className="ms-3 me-3 text-center feauteres-content">
								Our project helps you gain valuable insights into the emotional
								dynamics of you video. Unlock a comprehensive report with 7
								distinct emotions.
							</h6>
						</Col>
						<Col sm={12} className="pt-5 d-flex justify-content-center">
							<img
								alt=""
								src="/images/features.png"
								style={{ width: "80%", height: "80%" }}
							/>
						</Col>
					</Row>
				</Col>
				<Col
					md={6}
					sm={12}
					className="pt-5  d-flex justify-content-center align-items-center"
				>
					<Row>
						<FeatureCard features={featuresData.features} />
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default Features
