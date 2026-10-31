// Lo que define a una marca. Para agregar una marca nueva: copia uno de los
// archivos de esta carpeta, cambia los valores y regístrala en ./index.ts.
export type Marca = {
	id: string;
	nombre: string;
	colores: {
		/** Fondo principal de los videos */
		fondo: string;
		/** Texto sobre el fondo */
		texto: string;
		/** Color de la marca: botones, resaltados */
		primario: string;
		/** Texto sobre el color primario */
		textoSobrePrimario: string;
		/** Detalles secundarios: líneas, viñetas */
		acento: string;
	};
	fuentes: {
		titulo: string;
		cuerpo: string;
		/** Peso de los títulos (700, 800…) */
		pesoTitulo: number;
	};
	/** Logo que se ve bien sobre `colores.fondo` (ruta dentro de public/) */
	logo: string;
	/** Ancho del logo en la escena final, en px sobre 1080 */
	anchoLogo: number;
	/** Texto de contacto que aparece al final (web, WhatsApp…) */
	contacto: string;
};
