import React, { useEffect } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap"
import { registerUser, setErrorMessage } from "../../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

const SignUpForm: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: "",
			name: "",
			surname: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			name: Yup.string().required("First Name is required"),
			surname: Yup.string().required("Last Name is required"),
			password: Yup.string().required("Password is required"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.required("Confirm Password is required"),
		}),
		onSubmit: (values) => {
			dispatch(registerUser(values))
		},
	})

	const error = useSelector((state: any) => state.auth.error)
	const loading = useSelector((state: any) => state.auth.loading)
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	)

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/userProfile")
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		if (error) {
			formik.resetForm() // Reset Formik form if there's an error
		}
	}, [error, formik])

	return (
		<>
			{loading && (
				<div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white opacity-75">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}
			<div className="card bg-glass ">
				<div className="card-body px-4 py-5 px-md-5">
					<Form onSubmit={formik.handleSubmit}>
						<Form.Group className="mb-4">
							<Form.Control
								type="email"
								id="email"
								placeholder="Email address"
								{...formik.getFieldProps("email")}
							/>
							{formik.touched.email && formik.errors.email && (
								<div className="text-danger">{formik.errors.email}</div>
							)}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Control
								type="text"
								id="name"
								placeholder="First Name"
								{...formik.getFieldProps("name")}
							/>
							{formik.touched.name && formik.errors.name && (
								<div className="text-danger">{formik.errors.name}</div>
							)}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Control
								type="text"
								id="surname"
								placeholder="Last Name"
								{...formik.getFieldProps("surname")}
							/>
							{formik.touched.surname && formik.errors.surname && (
								<div className="text-danger">{formik.errors.surname}</div>
							)}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Control
								type="password"
								id="password"
								placeholder="Password"
								{...formik.getFieldProps("password")}
							/>
							{formik.touched.password && formik.errors.password && (
								<div className="text-danger">{formik.errors.password}</div>
							)}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Control
								type="password"
								id="confirmPassword"
								placeholder="Confirm password"
								{...formik.getFieldProps("confirmPassword")}
							/>
							{formik.touched.confirmPassword &&
								formik.errors.confirmPassword && (
									<div className="text-danger">
										{formik.errors.confirmPassword}
									</div>
								)}
						</Form.Group>
						{error && <Alert variant="danger">{error}</Alert>}
						<div className="text-center mb-4">
							<Button
								variant="primary"
								type="submit"
								className="btn btn-primary"
							>
								Sign Up
							</Button>
						</div>
						<p className="text-center">
							Already have an account?{" "}
							<Link to="/signIn">
								<a>Login</a>
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</>
	)
}

export default SignUpForm
