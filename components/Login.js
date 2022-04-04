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
				setUser({
					username: result.user.displayName,
					profilePic: result.user.photoURL,
					id: result.user.uid,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="grid place-items-center h-screen w-screen bg-[#fefc01]">
			<div className="flex flex-col justify-center items-center">
				<img className="h-[300px] object-contain" src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
				{loadingUser ? (
					<div className="bg-white flex flex-col items-center h-[20%] w-[50%]">
						<h2 className="text-xl">Loading</h2>
						<img className="h-30 w-30" src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="Loading" />
					</div>
				) : (
					<button onClick={login} className="bg-transparent px-6 text-lg border border-black rounded-md hover:bg-yellow-200">
						LOGIN
					</button>
				)}
			</div>
		</div>
	);
}
export default Login;
