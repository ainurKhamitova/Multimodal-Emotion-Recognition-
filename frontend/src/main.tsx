import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/index.css"
import SignInPage from "./pages/SignInPage"
import Home from "./pages/Home"
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom"
import SignUpPage from "./pages/SignUpPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/signin" element={<SignInPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/userProfile" element={<ProfilePage />} />
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
