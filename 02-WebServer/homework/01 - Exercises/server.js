var http = require("http");
var fs = require("fs");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

console.log(`Server raised in port ${PORT}`);

const server = http.createServer((req, res) => {

	const { url } = req;

	switch (url) {

		case '/api':
			fs.readFile(__dirname + '/utils/dogsData.json', (err, data) => {
				if (err) {
					res.writeHead(404, { 'Content-Type': 'text/plain' });
					res.end('json not found');
				} else {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(data);
				}
			})
			return;

		case '/allDogs':
			fs.readFile(__dirname + '/utils/allDogs.html', 'utf8', (err, data) => {
				if (err) {
					res.writeHead(404, { 'Content-Type': 'text/plain' })
					res.end('html not found')
				} else {
					res.writeHead(200, { 'Content-Type': 'text/html' })
					res.end(data)
				}
			})
			return;

		default:
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Route not found");
			return;
	}



});
server.listen(PORT, 'localhost')

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports = server;
/* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */

