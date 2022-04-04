import { useStore } from "../../appStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function View() {
	const snap = useStore((state) => state.snap);
	const router = useRouter();

	useEffect(() => {
		if (!snap) {
			exit();
		}
	}, [snap]);

	const exit = () => {
		router.push("/chats");
	};

	return (
		<div className="relative">
			<img className="cursor-pointer rounded-2xl" src={snap} alt="" onClick={exit} />
			<div className="absolute top-0 right-0 m-4">
				<CountdownCircleTimer isPlaying duration={10} strokeWidth={6} size={50} colors={["#004777", "#F7B801", "#A30000", "#A30000"]} colorsTime={[7, 5, 2, 0]}>
					{({ remainingTime }) => {
						if (remainingTime === 0) {
							exit();
						}
						return remainingTime;
					}}
				</CountdownCircleTimer>
			</div>
		</div>
	);
}
export default View;
