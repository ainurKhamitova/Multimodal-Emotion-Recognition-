import React from "react"
import { ListGroup } from "react-bootstrap"

interface TechListProps {
	technologies: string[]
	onTechHover: (tech: string) => void
}

const TechList: React.FC<TechListProps> = ({ technologies, onTechHover }) => {
	return (
		<ListGroup className="p-3 techlist">
			{technologies.map((tech) => (
				<ListGroup.Item
					className="techlist-item"
					key={tech}
					onMouseEnter={() => onTechHover(tech)}
				>
					{tech}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export default TechList
