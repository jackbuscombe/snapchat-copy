import { getAuth, signInWithPopup } from "firebase/auth";
import { useStore } from "../appStore";
import { provider } from "../firebase";

function Login() {
	const auth = getAuth();
	const setUser = useStore((state) => state.setUser);
	const loadingUser = useStore((state) => state.loadingUser);
	const setLoadingUser = useStore((state) => state.setLoadingUser);

	const login = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				setUser(result.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="grid place-items-center h-screen w-screen bg-yellow-300">
			<div className="flex flex-col">
				<img src="snapchatLogo" alt="" />
				{loadingUser ? (
					<div className="bg-white flex flex-col justify-center items-center h-[50%] w-[50%]">
						<h2 className="text-xl">Loading</h2>
						<img className="h-30 w-30" src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="Loading" />
					</div>
				) : (
					<button onClick={login} className="bg-transparent px-6 text-lg border border-black rounded-md">
						LOGIN
					</button>
				)}
			</div>
		</div>
	);
}
export default Login;
