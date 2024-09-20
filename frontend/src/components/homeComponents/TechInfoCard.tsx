// TechInfoCard.tsx
import React from "react"
import { Card, Col, Row } from "react-bootstrap"

interface TechInfoCardProps {
	tech: string
}

interface TechInfo {
	[key: string]: {
		title: string
		description: string
		image: string
	}
}

const TechInfoCard: React.FC<TechInfoCardProps> = ({ tech }) => {
	const techInfo: TechInfo = {
		"Frontend Development": {
			title: "React and TypeScript",
			description:
				"Elevate user experiences with React and TypeScript. Our frontend development is powered by React's component-based architecture and the type-safety of TypeScript, delivering robust, scalable, and highly interactive web applications. Embrace innovation in user interface design and seamless user interactions.",
			image: "/images/react-ts.png",
		},
		"Backend Development": {
			title: "Flask",
			description:
				"Fueling the backend with Flask, we prioritize simplicity, elegance, and efficiency. Flask, a micro web framework for Python, empowers us to craft scalable and maintainable APIs. It's the backbone of our server, seamlessly handling data requests, ensuring smooth communication between the frontend and the backend.",
			image: "/images/flask.png",
		},
		"Model Development": {
			title: "Tensorflow",
			description:
				"At the heart of our intelligent solutions lies Tensorflow. Our model development is driven by the power and flexibility of Tensorflow, enabling us to create state-of-the-art machine learning models. From natural language processing to computer vision, Tensorflow empowers us to unlock the potential of artificial intelligence for real-world applications.",
			image: "/images/tensorflow.png",
		},
	}

	const { title, description, image } = techInfo[tech]

	return (
		<>
			<Card className="h-100 mx-auto p-3 techCard">
				<Row>
					<Col xs={12} md={8} className="d-flex align-items-center">
						<Card.Img
							src={image}
							style={{
								width: "90%",
								height: "220px",
							}}
						/>
					</Col>
					<Col xs={12} md={4}>
						<Card.Body>
							<Card.Title className="techCard-title">{title}</Card.Title>
							<Card.Text className="techCard-description">
								{description}
							</Card.Text>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export default TechInfoCard
