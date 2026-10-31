import {cargarFuente} from './fuente';
import type {Marca} from './tipos';

const montserrat = cargarFuente('Montserrat', {700: 'montserrat-700.woff2'});
const questrial = cargarFuente('Questrial', {400: 'questrial-400.woff2'});

// Colores y fuentes tomados del tema de fruitsante.co; dorado tomado del logo.
export const fruitSante: Marca = {
	id: 'fruit-sante',
	nombre: 'Fruit Santé',
	colores: {
		fondo: '#fcfbf5',
		texto: '#061e2f',
		primario: '#061e2f',
		textoSobrePrimario: '#fcfbf5',
		acento: '#c2a453',
	},
	fuentes: {
		titulo: montserrat,
		cuerpo: questrial,
		pesoTitulo: 700,
	},
	logo: 'marcas/fruit-sante/logo-dorado.png',
	anchoLogo: 560,
	contacto: 'fruitsante.co',
};
