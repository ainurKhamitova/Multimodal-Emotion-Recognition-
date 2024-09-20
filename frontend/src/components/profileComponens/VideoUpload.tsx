import React from "react"
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap"
import { uploadVideo, setErrorMessage } from "../../slices/videoSlice"
import { updateUserData } from "../../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"

const VideoUpload: React.FC = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: any) => state.auth.user)
	const loading = useSelector((state: any) => state.video.loading)
	const error = useSelector((state: any) => state.video.error)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const video = (e.target as HTMLFormElement).elements.namedItem(
			"video"
		) as HTMLInputElement

		if (video && video.files && video.files.length > 0) {
			const formData = new FormData()
			console.log(video.files[0], user.email)

			formData.append("video", video.files[0])
			formData.append("email", user.email)

			try {
				// Dispatch the first action and wait for it to complete
				await dispatch(uploadVideo(formData))

				// Dispatch the second action and wait for it to complete
				await dispatch(updateUserData(user.email))

				// Both actions have been completed successfully
				console.log("Actions executed sequentially.")
			} catch (error) {
				// Handle any errors that may occur during the execution of the actions
				console.error("Error:", error)
			}
		} else {
			dispatch(setErrorMessage("Please select a file"))
		}
	}

	return (
		<Card.Body className="p-4 text-black">
			{loading && (
				<div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white opacity-75">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}
			<div className="mb-5">
				<p className="lead fw-normal mb-1">Upload Video</p>
				<div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
					<Form onSubmit={handleSubmit} className="mb-3">
						<Form.Group controlId="formFile">
							<Form.Label>Choose file</Form.Label>
							<Form.Control type="file" name="video" />
						</Form.Group>
						<Button type="submit" className="mt-2 outline-light">
							Upload
						</Button>
					</Form>
					{error && <Alert variant="danger">{error}</Alert>}
				</div>
			</div>
		</Card.Body>
	)
}

export default VideoUpload
