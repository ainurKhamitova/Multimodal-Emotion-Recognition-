import React, { useEffect } from "react"
import EmotionPieChart from "./EmotionPieChart"
import { Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import EmotionClip from "./EmotionClip"

const EmotionChartContainer: React.FC = () => {
	const emotionStatistics = useSelector((state: any) =>
		state.video.video ? state.video.video.statistics : null
	)

	const [emotionsData, setEmotionsData] = React.useState<any[]>([])
	console.log(emotionsData)

	useEffect(() => {
		if (emotionStatistics) {
			const emotionsData = Object.keys(emotionStatistics).map((emotion) => ({
				label: emotion,
				percentage: emotionStatistics[emotion],
			}))

			setEmotionsData(emotionsData)
		}
	}, [emotionStatistics])
	return (
		<Card.Body className="p-4 text-black">
			{emotionStatistics && (
				<Row>
					<Col md={6} sm={12} className="mb-5">
						<p className="lead fw-normal mb-1">Results</p>
						<div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
							<EmotionPieChart emotionsData={emotionsData} />
						</div>
					</Col>

					<Col md={6} sm={12} className="mb-5">
						<EmotionClip />
					</Col>
				</Row>
			)}
		</Card.Body>
	)
}

export default EmotionChartContainer
