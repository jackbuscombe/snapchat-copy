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
			} else {
				setUser(null);
			}
			setLoadingUser(false);
		});
	}, []);

	if (!user) {
		return <Login />;
	}

	return (
		<div className="flex flex-col items-center justify-center bg-[#fefc01] h-screen">
			<div className="flex flex-col items-center">
				<img className="h-20 w-30" src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
