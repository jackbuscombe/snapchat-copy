import { useEffect } from "react";
import { useStore } from "../appStore";
import Login from "../components/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const auth = getAuth();
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);
	const loadingUser = useStore((state) => state.loadingUser);
	const setLoadingUser = useStore((state) => state.setLoadingUser);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			}
			setLoadingUser(false);
		});
	}, []);

	if (!user) {
		return <Login />;
	}

	return (
		<div className="flex flex-col items-center justify-center bg-[#fefc01] h-screen">
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
