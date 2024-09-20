import { Navbar, Container } from "react-bootstrap"
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa"
import { FC } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../slices/authSlice"

const Header: FC = (logout) => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	)

	return (
		<>
			<Navbar className="bg-navbar sticky-top">
				<Container>
					<Navbar.Brand>
						{isAuthenticated ? (
							<img
								alt=""
								src="/images/logo.png"
								width="180"
								height="60"
								className="d-inline-block align-top ms-5"
							/>
						) : (
							<Link to="/">
								<img
									alt=""
									src="/images/logo.png"
									width="180"
									height="60"
									className="d-inline-block align-top ms-5"
								/>
							</Link>
						)}
					</Navbar.Brand>

					<Navbar.Collapse className="justify-content-end">
						{!isAuthenticated ? (
							<Navbar.Text>
								<Link to="/signin" className="text-white me-3">
									<FaSignInAlt size={30} className="me-4 menu-icon" />
								</Link>
								<Link to="/signup" className="text-white me-3">
									<FaUserPlus size={30} className="me-3 menu-icon" />
								</Link>
							</Navbar.Text>
						) : (
							<Navbar.Text>
								{/* <Link to="/userProfile" className="text-white me-3">
									<FaUser size={30} className="me-4 menu-icon" />
								</Link> */}
								{/* <Link
									to="/signin"
									className="text-white me-3"
									onClick={handleLogout}
								>
									<FaSignOutAlt size={30} className="me-4 menu-icon" />
								</Link> */}
							</Navbar.Text>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
