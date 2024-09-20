import { useState, FC } from "react"
import { Col, Container, Row } from "react-bootstrap"
import TechInfoCard from "./TechInfoCard"
import TechList from "./TechList"

const Techs: FC = () => {
	const [selectedTech, setSelectedTech] = useState<string>(
		"Frontend Development"
	)

	const handleTechHover = (tech: string): void => {
		setSelectedTech(tech)
	}

	return (
		<Container className="techs p-3">
			<Row className="p-3">
				<Col sm={12} md={4} className="text-center">
					<h2 className="text-center techs-header ">
						Building New Innovations with{" "}
						<span className="features-header">
							Cutting-Edge Technology Stacks
						</span>
					</h2>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="d-flex align-items-center">
					<TechList
						technologies={[
							"Frontend Development",
							"Backend Development",
							"Model Development",
						]}
						onTechHover={handleTechHover}
					/>
				</Col>
				<Col sm={9}>{selectedTech && <TechInfoCard tech={selectedTech} />}</Col>
			</Row>
		</Container>
	)
}

export default Techs
