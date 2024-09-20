import { FC } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { FaLinkedin } from "react-icons/fa"

interface Member {
	name: string
	role: string
	image: string
}

interface TeamProps {
	teamMembers: Member[]
}

const TeamCard: FC<TeamProps> = ({ teamMembers }) => {
	return (
		<>
			{teamMembers.map((member, index) => (
				<Col
					key={index}
					lg={4}
					md={6}
					sm={12}
					className="d-flex justify-content-center"
				>
					<Card className="team-card m-2">
						<Card.Body>
							<Row>
								<Col className=" d-flex justify-content-center flex-column  card-info">
									<img
										src={member.image}
										alt={member.name}
										width={100}
										height={100}
										className="team-card-avatar "
									/>

									<Card.Title className="text-center team-card-title">
										{member.name}
									</Card.Title>
									<Card.Subtitle className="team-card-subtitle text-center">
										{member.role}
									</Card.Subtitle>
								</Col>

								<ul className="team-card-social">
									<li className="team-card-social__item">
										<svg>
											{" "}
											<FaLinkedin />
										</svg>
									</li>
								</ul>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			))}
		</>
	)
}

export default TeamCard
