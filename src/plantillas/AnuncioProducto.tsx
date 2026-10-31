import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
	type CalculateMetadataFunction,
} from 'remotion';
import {marcas, type IdMarca, type Marca} from '../marcas';

// Anuncio en tres escenas: gancho → detalle (fotos + puntos) → cierre (logo + llamado).
// Funciona en vertical (1080x1920), cuadrado (1080x1080) u horizontal: todo se
// escala con el ancho del video.
export type PropsAnuncioProducto = {
	marca: IdMarca;
	/** Frase de apertura, la que detiene el scroll */
	gancho: string;
	/** 2 a 4 frases cortas con lo que se ofrece */
	puntos: string[];
	/** Llamado a la acción del cierre */
	llamado: string;
	/** Fotos dentro de public/ (opcional). Sin fotos, los puntos ocupan la pantalla. */
	imagenes?: string[];
};

const FPS = 30;
const DUR_GANCHO = 75;
const DUR_PUNTO = 45;
const DUR_CIERRE = 120;
const duracionDetalle = (puntos: string[]) =>
	Math.max(150, 45 + puntos.length * DUR_PUNTO);

export const calcularDuracion: CalculateMetadataFunction<
	PropsAnuncioProducto
> = ({props}) => ({
	durationInFrames: DUR_GANCHO + duracionDetalle(props.puntos) + DUR_CIERRE,
	fps: FPS,
});

/** Unidad de medida: 1 = 1px en un video de 1080 de ancho */
const useU = () => useVideoConfig().width / 1080;

const useEntrada = (retraso = 0) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - retraso, fps, config: {damping: 200}});
};

const Fundido: React.FC<{duracion: number; children: React.ReactNode}> = ({
	duracion,
	children,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[0, 8, duracion - 8, duracion],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

const Gancho: React.FC<{marca: Marca; texto: string}> = ({marca, texto}) => {
	const u = useU();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const palabras = texto.split(' ');
	const barra = useEntrada(4);
	return (
		<AbsoluteFill
			style={{
				backgroundColor: marca.colores.fondo,
				justifyContent: 'center',
				padding: 90 * u,
			}}
		>
			<div
				style={{
					width: 160 * u * barra,
					height: 14 * u,
					backgroundColor: marca.colores.primario,
					borderRadius: 7 * u,
					marginBottom: 50 * u,
				}}
			/>
			<div
				style={{
					fontFamily: marca.fuentes.titulo,
					fontWeight: marca.fuentes.pesoTitulo,
					fontSize: 112 * u,
					lineHeight: 1.08,
					color: marca.colores.texto,
					display: 'flex',
					flexWrap: 'wrap',
					columnGap: 26 * u,
				}}
			>
				{palabras.map((p, i) => {
					const s = spring({
						frame: frame - 6 - i * 4,
						fps,
						config: {damping: 14, mass: 0.6},
					});
					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								opacity: s,
								transform: `translateY(${(1 - s) * 60 * u}px)`,
							}}
						>
							{p}
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

const Fotos: React.FC<{imagenes: string[]; duracion: number}> = ({
	imagenes,
	duracion,
}) => {
	const frame = useCurrentFrame();
	const porFoto = duracion / imagenes.length;
	return (
		<AbsoluteFill>
			{imagenes.map((src, i) => {
				const inicio = i * porFoto;
				const opacity =
					i === 0
						? 1
						: interpolate(frame, [inicio - 10, inicio + 5], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
				const zoom = interpolate(
					frame,
					[inicio - 10, inicio + porFoto],
					[1.0, 1.12],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				return (
					<AbsoluteFill key={src} style={{opacity}}>
						<Img
							src={staticFile(src)}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								transform: `scale(${zoom})`,
							}}
						/>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};

const Punto: React.FC<{
	marca: Marca;
	texto: string;
	retraso: number;
	grande: boolean;
}> = ({marca, texto, retraso, grande}) => {
	const u = useU();
	const s = useEntrada(retraso);
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 28 * u,
				opacity: s,
				transform: `translateX(${(1 - s) * -80 * u}px)`,
			}}
		>
			<div
				style={{
					flexShrink: 0,
					width: (grande ? 34 : 26) * u,
					height: (grande ? 34 : 26) * u,
					borderRadius: '50%',
					backgroundColor: marca.colores.acento,
				}}
			/>
			<div
				style={{
					fontFamily: marca.fuentes.cuerpo,
					fontSize: (grande ? 80 : 58) * u,
					lineHeight: 1.2,
					color: marca.colores.texto,
				}}
			>
				{texto}
			</div>
		</div>
	);
};

const Detalle: React.FC<{
	marca: Marca;
	puntos: string[];
	imagenes: string[];
	duracion: number;
}> = ({marca, puntos, imagenes, duracion}) => {
	const u = useU();
	const {height, width} = useVideoConfig();
	const conFotos = imagenes.length > 0;
	// En vertical la foto ocupa más; en cuadrado/horizontal deja espacio al texto.
	const altoFoto = conFotos ? (height > width ? 0.58 : 0.5) * height : 0;
	const lista = (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: (conFotos ? 34 : 60) * u,
			}}
		>
			{puntos.map((p, i) => (
				<Punto
					key={i}
					marca={marca}
					texto={p}
					retraso={15 + i * DUR_PUNTO}
					grande={!conFotos}
				/>
			))}
		</div>
	);
	return (
		<AbsoluteFill style={{backgroundColor: marca.colores.fondo}}>
			{conFotos ? (
				<>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: altoFoto,
							overflow: 'hidden',
						}}
					>
						<Fotos imagenes={imagenes} duracion={duracion} />
					</div>
					<div
						style={{
							position: 'absolute',
							top: altoFoto - 6 * u,
							left: 0,
							right: 0,
							height: 12 * u,
							backgroundColor: marca.colores.acento,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: altoFoto,
							left: 0,
							right: 0,
							bottom: 0,
							display: 'flex',
							alignItems: 'center',
							padding: `0 ${80 * u}px`,
						}}
					>
						{lista}
					</div>
				</>
			) : (
				<AbsoluteFill style={{justifyContent: 'center', padding: 90 * u}}>
					{lista}
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};

const Cierre: React.FC<{marca: Marca; llamado: string}> = ({
	marca,
	llamado,
}) => {
	const u = useU();
	const logo = useEntrada(0);
	const boton = useEntrada(18);
	const contacto = useEntrada(30);
	const frame = useCurrentFrame();
	const pulso = 1 + Math.sin(Math.max(0, frame - 40) / 6) * 0.025;
	return (
		<AbsoluteFill
			style={{
				backgroundColor: marca.colores.fondo,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 80 * u,
				padding: 80 * u,
			}}
		>
			<Img
				src={staticFile(marca.logo)}
				style={{
					width: marca.anchoLogo * u,
					opacity: logo,
					transform: `scale(${0.85 + logo * 0.15})`,
				}}
			/>
			<div
				style={{
					fontFamily: marca.fuentes.titulo,
					fontWeight: marca.fuentes.pesoTitulo,
					fontSize: 60 * u,
					color: marca.colores.textoSobrePrimario,
					backgroundColor: marca.colores.primario,
					padding: `${30 * u}px ${64 * u}px`,
					borderRadius: 999,
					textAlign: 'center',
					opacity: boton,
					transform: `translateY(${(1 - boton) * 40 * u}px) scale(${pulso})`,
				}}
			>
				{llamado}
			</div>
			<div
				style={{
					fontFamily: marca.fuentes.cuerpo,
					fontSize: 40 * u,
					color: marca.colores.texto,
					opacity: contacto * 0.85,
					textAlign: 'center',
				}}
			>
				{marca.contacto}
			</div>
		</AbsoluteFill>
	);
};

export const AnuncioProducto: React.FC<PropsAnuncioProducto> = ({
	marca: idMarca,
	gancho,
	puntos,
	llamado,
	imagenes = [],
}) => {
	const marca = marcas[idMarca];
	const durDetalle = duracionDetalle(puntos);
	return (
		<AbsoluteFill style={{backgroundColor: marca.colores.fondo}}>
			<Sequence durationInFrames={DUR_GANCHO}>
				<Fundido duracion={DUR_GANCHO}>
					<Gancho marca={marca} texto={gancho} />
				</Fundido>
			</Sequence>
			<Sequence from={DUR_GANCHO} durationInFrames={durDetalle}>
				<Fundido duracion={durDetalle}>
					<Detalle
						marca={marca}
						puntos={puntos}
						imagenes={imagenes}
						duracion={durDetalle}
					/>
				</Fundido>
			</Sequence>
			<Sequence from={DUR_GANCHO + durDetalle}>
				<Cierre marca={marca} llamado={llamado} />
			</Sequence>
		</AbsoluteFill>
	);
};
