import React, { useState } from "react"
import { Button, Spinner, Modal } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../slices/authSlice"
import { getResults } from "../../slices/videoSlice"
import { useNavigate } from "react-router-dom"
import EmotionTable from "./EmotionTable" // Import the EmotionTable component

const UserInfo: React.FC = () => {
	const user = useSelector((state: any) => state.auth.user)
	const loading = useSelector((state: any) => state.auth.loading)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logoutUser())
		navigate("/signin")
	}

	const [showEmotionTable, setShowEmotionTable] = useState(false)

	const handleCloseEmotionTable = () => setShowEmotionTable(false)

	const handleShowEmotionTable = () => {
		dispatch(getResults(user.email))

		setShowEmotionTable(true)
	}

	return (
		<>
			{loading && (
				<div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white opacity-75">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}
			<div className="rounded-top text-white d-flex flex-row profile-header">
				<div
					className="ms-4 mt-5 d-flex flex-column"
					style={{ width: "150px" }}
				>
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
						alt="Generic placeholder image"
						className="img-fluid img-thumbnail mt-4 mb-2"
						style={{ width: "150px", zIndex: 1 }}
					/>
					<Button
						variant="outline-danger"
						data-mdb-ripple-color="dark"
						style={{ zIndex: 1 }}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
				<div className="ms-3" style={{ marginTop: "130px" }}>
					<h5>
						{user?.name} {user?.surname}
					</h5>
					<p>{user?.email}</p>
				</div>
			</div>
			<div
				className="p-4 text-black"
				style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
				onClick={handleShowEmotionTable} // Call handleShowEmotionTable when clicked
			>
				<div className="d-flex justify-content-end text-center py-3">
					<div>
						<p className="mb-1 h4"> {user?.video_count}</p>
						<p className="small text-muted mb-0">Videos</p>
					</div>
				</div>
			</div>

			{/* EmotionTable Modal */}
			<Modal
				show={showEmotionTable}
				onHide={handleCloseEmotionTable}
				dialogClassName="modal-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Emotion Table</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "80vh", maxWidth:"100%"}}>
						<EmotionTable onClose={handleCloseEmotionTable} />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEmotionTable}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UserInfo
