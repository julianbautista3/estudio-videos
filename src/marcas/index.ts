import {fruitSante} from './fruit-sante';
import {prodrivers} from './prodrivers';
import type {Marca} from './tipos';

export type {Marca} from './tipos';

export const marcas = {
	prodrivers,
	'fruit-sante': fruitSante,
} satisfies Record<string, Marca>;

export type IdMarca = keyof typeof marcas;
