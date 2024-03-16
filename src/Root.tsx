import {Composition, staticFile} from 'remotion';
import {z} from 'zod';
import {MyComposition, myCompSchema} from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				fps={30}
				width={1280}
				height={720}
				schema={myCompSchema}
				defaultProps={{
					segments: [],
				}}
				calculateMetadata={async () => {
					const fps = 30;
					const durationInFrames = fps * (20 * 60 + 38) + 19;

					const speakersForEachFrame = Array.from(
						{length: durationInFrames},
						() => [] as string[]
					);

					const res = await fetch(staticFile('/segmentation.json'));
					const data = z
						.object({
							output: z.object({
								segments: z.array(
									z.object({
										speaker: z.string(),
										start: z.string(),
										stop: z.string(),
									})
								),
							}),
						})
						.parse(await res.json());

					for (const segment of data.output.segments) {
						const startFrame = timeToFrame(segment.start, fps);
						const stopFrame = timeToFrame(segment.stop, fps);

						console.log({startFrame, stopFrame});

						for (
							let frameIndex = startFrame;
							frameIndex < stopFrame;
							frameIndex++
						) {
							speakersForEachFrame[frameIndex].push(segment.speaker);
						}
					}

					console.log({speakersForEachFrame});

					return {
						fps,
						durationInFrames,
						props: {
							segments: speakersForEachFrame,
						},
					};
				}}
			/>
		</>
	);
};

function timeToFrame(time: string, fps: number): number {
	const [hours, minutes, secondsGroups] = time.split(':');
	const [seconds, milliseconds] = secondsGroups.split('.');

	return (
		(Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * fps +
		mapFloatToFrame(Number(`0.${milliseconds}`), fps)
	);
}

function mapFloatToFrame(float: number, fps: number) {
	return Math.floor(float * fps);
}
