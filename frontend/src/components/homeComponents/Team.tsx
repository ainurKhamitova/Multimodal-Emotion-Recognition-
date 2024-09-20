import { FC } from "react"
import { Col, Container, Row } from "react-bootstrap"
import teamData from "../../teamData"
import TeamCard from "./TeamCard"

const Team: FC = () => {
	return (
		<Container className="team p-3">
			<Row>
				<Col md={12} sm={12} className="text-center">
					<h2 className="text-center team-header">Meet the Team</h2>
				</Col>
			</Row>

			<Row className="p-3">
				<TeamCard teamMembers={teamData.teamMembers} />
			</Row>
		</Container>
	)
}

export default Team
