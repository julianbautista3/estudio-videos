import React from 'react';
import {Composition, Folder} from 'remotion';
import {marcas} from './marcas';
import {
	AnuncioProducto,
	calcularDuracion,
} from './plantillas/AnuncioProducto';
import {tamanos, videos} from './videos';

// Arma una composición por video, agrupadas por marca en el editor (npm run dev).
export const Root: React.FC = () => {
	return (
		<>
			{Object.keys(marcas).map((idMarca) => (
				<Folder key={idMarca} name={idMarca}>
					{videos
						.filter((v) => v.props.marca === idMarca)
						.map((v) => (
							<Composition
								key={v.id}
								id={v.id}
								component={AnuncioProducto}
								calculateMetadata={calcularDuracion}
								durationInFrames={300}
								fps={30}
								{...tamanos[v.formato]}
								defaultProps={v.props}
							/>
						))}
				</Folder>
			))}
		</>
	);
};
