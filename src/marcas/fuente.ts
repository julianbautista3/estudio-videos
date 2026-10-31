import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Las fuentes viven en public/fuentes/ para que los videos salgan iguales en
// cualquier equipo, sin depender de internet. Devuelve el nombre de la familia.
export const cargarFuente = (
	familia: string,
	archivos: Record<number, string>,
): string => {
	for (const [peso, archivo] of Object.entries(archivos)) {
		loadFont({
			family: familia,
			url: staticFile(`fuentes/${archivo}`),
			weight: peso,
		});
	}
	return familia;
};
