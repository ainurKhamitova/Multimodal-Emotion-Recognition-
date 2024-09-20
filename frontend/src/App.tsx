import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "./store"

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Header />
				<main>
					<Container className="w-100 p-0">
						{" "}
						<Outlet />
					</Container>
				</main>
				<Footer />
			</PersistGate>
		</Provider>
	)
}

export default App
