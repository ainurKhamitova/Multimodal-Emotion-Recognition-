import React from "react"
import { Container } from "react-bootstrap"

const Footer: React.FC = () => {
	return (
		<Container className="footer text-center">
			<footer className="d-flex justify-content-center align-items-center footer">
				<p>
					&copy; Nazarbayev University. "Multimodal Emotion Recognition with
					Deep Learning". Senior Project 2023/2024.
				</p>
			</footer>
		</Container>
	)
}

export default Footer
