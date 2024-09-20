import React, { useEffect, useState } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../slices/authSlice"
import { useFormik } from "formik"
import * as Yup from "yup"

const SignInForm: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			password: Yup.string().required("Password is required"),
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values))
		},
	})

	const error = useSelector((state: any) => state.auth.error)
	const loading = useSelector((state: any) => state.auth.loading)
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	)

	useEffect(() => {
		if (error) {
			formik.resetForm() // Reset Formik form if there's an error
		}
	}, [error])

	// Only run the effect when formik changes, not on every render
	useEffect(() => {
		if (formik && isAuthenticated) {
			navigate("/userProfile")
		}
	}, [formik, isAuthenticated, navigate])

	return (
		<>
			{loading && (
				<div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white opacity-75">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}
			<div className="card bg-glass">
				<div className="card-body px-4 py-5 px-md-5">
					<Form onSubmit={formik.handleSubmit}>
						<Form.Group className="mb-4">
							<Form.Control
								type="email"
								placeholder="Email address"
								{...formik.getFieldProps("email")}
							/>
							{formik.touched.email && formik.errors.email && (
								<div className="text-danger">{formik.errors.email}</div>
							)}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Control
								type="password"
								placeholder="Password"
								{...formik.getFieldProps("password")}
							/>
							{formik.touched.password && formik.errors.password && (
								<div className="text-danger">{formik.errors.password}</div>
							)}
						</Form.Group>
						<div className="text-center mb-4">
							<Button
								variant="primary"
								type="submit"
								className="btn btn-primary"
							>
								Sign in
							</Button>
						</div>
						{error && <Alert variant="danger">{error}</Alert>}
						<p className="text-center">
							Don't have an account?{" "}
							<Link to="/signUp">
								<a>Register</a>
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</>
	)
}

export default SignInForm
