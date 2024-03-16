import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {z} from 'zod';

export const myCompSchema = z.object({
	segments: z.array(z.array(z.string())),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	segments,
}) => {
	const frame = useCurrentFrame();

	const participants = [
		{
			name: 'Baptiste',
			color: '#ffffff',
			imageSrc: staticFile('/9c24fe133eef5dd22dc10a881d96ba61.jpg'),
			speakerLabel: 'A',
		},
		{
			name: 'Paul',
			color: '#B5EEE8',
			imageSrc: staticFile('/8c27492a8f67deb48d159fb1e6e021eb.png'),
			speakerLabel: 'B',
		},
		{
			name: 'Maïwenn',
			color: '#FFDFE0',
			imageSrc: staticFile('/e2aa32005fcb0e474884cf3b1fa57a9b.png'),
			speakerLabel: 'D',
		},
		{
			name: 'David',
			color: '#DCEDFF',
			imageSrc: staticFile('/ce6fb028f0c69774c0003a1f80187c59.jpg'),
			speakerLabel: 'C',
		},
	];

	return (
		<AbsoluteFill className="">
			<div className="mx-20 my-16 grow relative">
				<div className="window">
					<div className="window__handler">
						<div className="window__title">Parlons Dev</div>
						<div className="window__controls">
							<a className="window__close" />
							<a className="window__minimize" />
							<a className="window__maximize" />
						</div>
					</div>

					<div className="window__body grid grid-cols-2 grid-rows-2 p-4 gap-2">
						{participants.map((p, i) => (
							<div
								key={i}
								className="grid grid-rows-1 rounded relative overflow-hidden"
							>
								<div className="flex flex-col justify-center items-center relative">
									<div
										className="absolute inset-0 opacity-100"
										style={{
											backgroundColor: p.color,
										}}
									/>

									<Img
										src={p.imageSrc}
										alt=""
										className={`size-32 object-cover object-center rounded-full z-10 ${
											segments[frame].includes(p.speakerLabel)
												? 'ring-4 ring-green-500 ring-offset-4'
												: ''
										}`}
									/>
								</div>

								<div className="absolute bottom-0 w-full bg-gray-900/20 px-2 py-0.5">
									<p>{p.name}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
