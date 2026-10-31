import type {PropsAnuncioProducto} from './plantillas/AnuncioProducto';

// Cada entrada es un video. Para hacer uno nuevo: copia una entrada, cambia el
// id (será el nombre del MP4), la marca, el formato y los textos.
// Formatos: vertical = 1080x1920 (Reels, TikTok, historias)
//           cuadrado = 1080x1080 (feed)
//           horizontal = 1920x1080 (YouTube, pantallas)

export type Formato = 'vertical' | 'cuadrado' | 'horizontal';

export const tamanos: Record<Formato, {width: number; height: number}> = {
	vertical: {width: 1080, height: 1920},
	cuadrado: {width: 1080, height: 1080},
	horizontal: {width: 1920, height: 1080},
};

export type Video = {
	id: string;
	plantilla: 'AnuncioProducto';
	formato: Formato;
	props: PropsAnuncioProducto;
};

export const videos: Video[] = [
	{
		id: 'fruit-sante-regala-emociones-vertical',
		plantilla: 'AnuncioProducto',
		formato: 'vertical',
		props: {
			marca: 'fruit-sante',
			gancho: '¿Quieres sorprender a alguien hoy?',
			puntos: [
				'Fresas con chocolate, flores y anchetas',
				'Hechos a mano por nuestras floristas',
				'Entrega el mismo día en Bogotá',
			],
			llamado: 'Pide el tuyo hoy',
			imagenes: [
				'marcas/fruit-sante/bouquet-y-fresas.jpg',
				'marcas/fruit-sante/bouquet-florista.jpg',
				'marcas/fruit-sante/bouquet-y-caja.jpg',
			],
		},
	},
	{
		id: 'fruit-sante-regala-emociones-cuadrado',
		plantilla: 'AnuncioProducto',
		formato: 'cuadrado',
		props: {
			marca: 'fruit-sante',
			gancho: 'Regala emociones',
			puntos: [
				'Fresas con chocolate y flores',
				'Entrega el mismo día en Bogotá',
			],
			llamado: 'Pide en fruitsante.co',
			imagenes: [
				'marcas/fruit-sante/bouquet-y-fresas.jpg',
				'marcas/fruit-sante/bouquet-y-caja.jpg',
			],
		},
	},
	{
		// Borrador: revisar textos con el equipo de ProDrivers antes de pautar.
		id: 'prodrivers-unete-vertical',
		plantilla: 'AnuncioProducto',
		formato: 'vertical',
		props: {
			marca: 'prodrivers',
			gancho: '¿Manejas con Yango? Gana más con ProDrivers',
			puntos: [
				'Retos con premios cada mes',
				'Asesoras que te acompañan',
				'Te atendemos por WhatsApp',
			],
			llamado: 'Escríbenos por WhatsApp',
		},
	},
];
