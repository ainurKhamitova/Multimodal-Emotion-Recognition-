
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import {
	FaSmile,
	FaSadTear,
	FaFlushed,
	FaSurprise,
	FaAngry,
	FaDizzy,
	FaRegMeh,
} from "react-icons/fa"
import ReactPlayer from "react-player"
import { useSelector } from "react-redux"


interface EmotionClips {
	[key: string]: string
}

const EmotionColumn: React.FC = () => {
	const emotionResults = useSelector((state: any) =>
		state.video.video ? state.video.video.result : null
	)

	const [clips, setClips] = useState<EmotionClips>({})
	// Define state to track which clip is currently selected
	const [selectedClip, setSelectedClip] = useState<string | null>(null)
	const [selectedClipLabel, setSelectedClipLabel] = useState<string | null>(null)
	// Define state to control the modal
	const [showModal, setShowModal] = useState<boolean>(false)

	useEffect(() => {
		if (emotionResults) {
			setClips(emotionResults)
		}
	}, [emotionResults])

	// Map emotions to icons based on available clips
	const emotions: EmotionClips = {
		happy: <FaSmile size={80} />,
		sad: <FaSadTear size={80} />,
		fear: <FaFlushed size={80} />,
		surprise: <FaSurprise size={80} />,
		angry: <FaAngry size={80} />,
		disgust: <FaDizzy size={80} />,
		neutral: <FaRegMeh size={80} />,
	}

	// Function to handle emoji click
	const handleEmojiClick = (emotion: string) => {
		const clipPath = clips?.[emotion]
		console.log(clipPath)

		setSelectedClip(clipPath)
		setSelectedClipLabel(emotion)
		setShowModal(true) // Show the modal when a clip is selected
		console.log(emotion)
		console.log(clipPath)
	}

	// Function to close the modal
	const handleCloseModal = () => {
		setSelectedClip(null)
		setShowModal(false)
	}

	//find same keys from clips and emotions, then return the emotion
	const availableEmotions = clips
		? Object.keys(clips).filter((emotion) => emotion in emotions)
		: []

	return (
		<Container className="m-3 pt-3">
			<Row>
				{availableEmotions.map((emotion) => (
					<Col md={4}>
						<Button
							variant="light lg"
							key={emotion}
							onClick={() => handleEmojiClick(emotion)}
						>
							{emotions[emotion]}
						</Button>
					</Col>
				))}
			</Row>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Selected Clip - {selectedClipLabel}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Render the selected clip in the modal body */}
					{selectedClip && (
						<ReactPlayer
							url={selectedClip}
							width="100%"
							height="100%"
							controls
							autoPlay
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default EmotionColumn
