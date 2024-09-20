import { FC } from "react"
import { Card, Col } from "react-bootstrap"

interface Feature {
	title: string
	description: string
	icon: JSX.Element
}

interface FeaturesProps {
	features: Feature[]
}

const FeatureCard: FC<FeaturesProps> = ({ features }) => {
	return (
		<>
			{features.map((feature, index) => (
				<Col
					key={index}
					md={4}
					sm={6}
					className="d-flex justify-content-center mb-2"
				>
					<Card className="h-100 mx-auto feature-card">
						<div className="text-center mt-2 feature-icon">{feature.icon}</div>
						<Card.Body>
							<Card.Title className="text-center feature-title">
								{feature.title}
							</Card.Title>
							<Card.Text className="text-center feature-description">
								{feature.description}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
		</>
	)
}

export default FeatureCard
