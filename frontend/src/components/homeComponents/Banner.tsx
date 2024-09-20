import { FC } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { IoIosArrowRoundForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
const Banner: FC = () => {
	const navigate = useNavigate()
	return (
		<Container className="banner">
			<Row>
				<Col md={6} sm={12} className="d-flex justify-content-center">
					<Row className="p-3">
						<Col md={12} sm={12} className="pt-5 text-center">
							<h1 className="text-white text-center ">
								Where <span className="banner-header">Feelings</span> Speak
								Louder Than
								<span className="banner-header"> Words... </span>
							</h1>
						</Col>
						<Col md={12} sm={12} className="pt-5 text-center">
							<h3 className="text-white text-center banner-content">
								Revolutionize communication with our Multimodal Emotion
								Recognition technology. By seamlessly analyzing facial
								expressions, voice tones, and text, we empower interactions with
								a deeper understanding of emotions. From enhancing customer
								engagement to refining user experiences, our project opens doors
								to a world where emotions are recognized, bridging connections
								in ways words alone cannot.
							</h3>
						</Col>
						<Col md={12} sm={12} className="pt-5 text-center">
							<Button
								className="ms-2 mb-2 banner-button"
								onClick={() => navigate("/signin")}
							>
								Sign In <IoIosArrowRoundForward size={30} />
							</Button>{" "}
							<Button
								className="outline-banner-button ms-2 mb-2"
								onClick={() => navigate("/signup")}
							>
								Sign Up
								<IoIosArrowRoundForward size={30} />
							</Button>
						</Col>
					</Row>
				</Col>

				<Col md={6} sm={12} className="pt-5">
					<img alt="" src="/images/banner.png" width="90%" height="100%" />
				</Col>
			</Row>
		</Container>
	)
}

export default Banner
