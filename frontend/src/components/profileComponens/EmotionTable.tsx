import React from "react"
import {  Button, Table } from "react-bootstrap"
import { FaFileAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import { selectVideoHistory, deleteVideo } from "../../slices/videoSlice"
import { updateUserData } from "../../slices/authSlice"

interface EmotionTableProps {
	onClose: () => void
}

const EmotionTable: React.FC<EmotionTableProps> = ({ onClose }) => {
	const user = useSelector((state: any) => state.auth.user)
	const data = useSelector((state: any) => state.video.results) || []
	const dispatch = useDispatch()
	const handleView = async (video_title: any) => {
		console.log(video_title)

		try {
			await dispatch(selectVideoHistory(user.email, video_title))
			onClose()
			dispatch(updateUserData(user.email))
		} catch (error) {
			console.error("Error:", error)
		}
	}

	const handleDelete = async (video_title: any) => {
		try {
			// Dispatch the first action and wait for it to complete
			await dispatch(deleteVideo(user.email, video_title))

			// Dispatch the second action and wait for it to complete
			await dispatch(updateUserData(user.email))

			// Both actions have been completed successfully
			console.log("Actions executed sequentially.")
		} catch (error) {
			// Handle any errors that may occur during the execution of the actions
			console.error("Error:", error)
		}
	}

	const tableHeads = [
		{ happy: "Happy" },
		{ sad: "Sad" },
		{ angry: "Angry" },
		{ fear: "Fear" },
		{ surprise: "Surprise" },
		{ neutral: "Neutral" },
		{ disgust: "Disgust" },
	]

	const renderTableData = () => {
		if (!Array.isArray(data) || data.length === 0) {
			return (
				<tr>
					<td colSpan={tableHeads.length + 2}>No data available</td>
				</tr>
			)
		}

		return data.map((entry, index) => (
			<tr key={index}>
				<td style={{ width: "20%" }}>{entry.video_title}</td>
				{tableHeads.map((head, i) => (
					<td key={i} style={{ width: "7%" }}>{entry.emotions[Object.keys(head)[0]]?.toFixed(1) || 0} %</td>
				))}
				<td>
					<Button
						variant="outline-primary"
						onClick={() => handleView(entry.video_title)}
						className="me-2 text-center mb-2"
					>
						<FaFileAlt />
					</Button>
					<Button
						variant="outline-danger"
						onClick={() => handleDelete(entry.video_title)}
						className="me-2 text-center mb-2"
					>
						Delete
					</Button>
				</td>
			</tr>
		))
	}



	return (
		<Table  stripped bordered  hover style={{ width: '105%' }}>
			<thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
				<tr>
					<th >Name</th>
					{tableHeads.map((head, index) => (
						<th key={index}>{Object.values(head)[0]}</th>
					))}
					<th >Action</th>
				</tr>
			</thead>
			<tbody>{data && renderTableData()}</tbody>
		</Table>
	)	
}

export default EmotionTable
