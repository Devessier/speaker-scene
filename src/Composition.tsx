import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {z} from 'zod';

export const myCompSchema = z.object({
	frames: z.array(z.array(z.string())),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	frames,
}) => {
	const frame = useCurrentFrame();

	const participants = [
		{
			name: 'Adam',
			color: '#0b0b0b',
			imageSrc: staticFile('/adam.jpg'),
			speakerLabel: 'A',
		},
		{
			name: 'Ian',
			color: '#342f2a',
			imageSrc: staticFile('/ian.jpg'),
			speakerLabel: 'B',
		},
		{
			name: 'Aaron',
			color: '#e2ad9d',
			imageSrc: staticFile('/aaron.jpg'),
			speakerLabel: 'C',
		},
	];

	return (
		<AbsoluteFill className="">
			<div className="mx-20 my-16 grow relative">
				<div className="rounded-md shadow-2xl h-full bg-zinc-800">
					<div className="h-full grid grid-cols-3 grid-rows-1 p-4 gap-2">
						{participants.map((p, i) => (
							<div
								key={i}
								className="grid grid-rows-[1fr,auto] rounded relative overflow-hidden"
								style={{
									backgroundColor: p.color,
								}}
							>
								<div className="flex flex-col justify-center items-center relative">
									<div className="absolute inset-0 opacity-100" />

									<Img
										src={p.imageSrc}
										alt=""
										className={`size-32 object-cover object-center rounded-full z-10 shadow-md ${
											frames[frame].includes(p.speakerLabel)
												? 'ring-4 ring-green-500'
												: ''
										}`}
									/>
								</div>

								<div className="w-full bg-gray-900/20 px-2 py-0.5 text-white">
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
