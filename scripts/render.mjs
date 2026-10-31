// Genera los MP4 en out/.
//   npm run render                      → todos los videos
//   npm run render -- id-1 id-2         → solo esos
//   npm run render -- --marca=prodrivers → solo los de una marca
import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const args = process.argv.slice(2);
const marca = args.find((a) => a.startsWith('--marca='))?.split('=')[1];
const extra = process.env.REMOTION_BROWSER
	? [`--browser-executable=${process.env.REMOTION_BROWSER}`]
	: [];

const correr = (cmd) => {
	const r = spawnSync('npx', ['remotion', ...cmd, ...extra], {
		stdio: ['inherit', 'pipe', 'inherit'],
		encoding: 'utf8',
	});
	if (r.status !== 0) {
		process.stdout.write(r.stdout ?? '');
		process.exit(r.status ?? 1);
	}
	return r.stdout;
};

let ids = args.filter((a) => !a.startsWith('--'));
if (ids.length === 0) {
	// La lista viene en la última línea; antes pueden salir avisos (p. ej. la
	// descarga del navegador), así que solo se aceptan ids válidos.
	const lineas = correr(['compositions', '--quiet']).trim().split('\n');
	ids = (lineas.at(-1) ?? '')
		.split(/\s+/)
		.filter((id) => /^[A-Za-z0-9-]+$/.test(id));
}
if (marca) ids = ids.filter((id) => id.startsWith(`${marca}-`));
if (ids.length === 0) {
	console.error('No hay videos que generar.');
	process.exit(1);
}

mkdirSync('out', {recursive: true});
for (const id of ids) {
	console.log(`\n▶ ${id}`);
	const r = spawnSync(
		'npx',
		['remotion', 'render', id, `out/${id}.mp4`, ...extra],
		{stdio: 'inherit'},
	);
	if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log(`\nListo: ${ids.length} video(s) en out/`);
