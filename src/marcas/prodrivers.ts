import {cargarFuente} from './fuente';
import type {Marca} from './tipos';

const inter = cargarFuente('Inter', {
	400: 'inter-400.woff2',
	900: 'inter-900.woff2',
});

// Colores tomados del Marcador (prodrivers/site/index.html).
export const prodrivers: Marca = {
	id: 'prodrivers',
	nombre: 'ProDrivers',
	colores: {
		fondo: '#21201f',
		texto: '#ffffff',
		primario: '#e8231a',
		textoSobrePrimario: '#ffffff',
		acento: '#fc5230',
	},
	fuentes: {
		titulo: inter,
		cuerpo: inter,
		pesoTitulo: 900,
	},
	logo: 'marcas/prodrivers/logo-rojo.png',
	anchoLogo: 720,
	contacto: 'Socio de flota de Yango en Colombia',
};
