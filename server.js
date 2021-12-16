require('dotenv').config();
const http = require('http');
const fs = require('fs');
const { getUsersPage, getFormData } = require('./utils');

const { APP_HOST, APP_PORT } = process.env;

const users = [
	{ name: 'Sonia', birth: '2019-14-05' },
	{ name: 'Antoine', birth: '2000-12-05' },
	{ name: 'Alice', birth: '1990-14-09' },
	{ name: 'Sophie', birth: '2001-10-02' },
	{ name: 'Bernard', birth: '1980-21-08' }
];

const server = (req, res) => {
	const url = req.url.replace('/', '');

	// Ignorer les favicon
	if (url === 'favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		res.end();
		return;
	}

	// Envoyer le fichier bootstrap
	if (url === 'bootstrap') {
		res.writeHead(200, { 'Content-Type': 'text/css' });
		const bootstrap = fs.readFileSync(
			'./assets/css/bootstrap.min.css',
			'utf-8'
		);
		res.write(bootstrap);
		res.end();
		return;
	}

	// Page principale
	if (url === '') {
		// Envoyer la page principale
		if (req.method === 'GET') {
			const home = fs.readFileSync('./view/home.html', 'utf-8');
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(home);
			res.end();
			return;
		}

		// Traiter les données POST
		if (req.method === 'POST') {
			req.on('data', (data) => {
				const user = getFormData(data);
				users.push(user);
			});
			req.on('end', () => {
				// Redirection vers la list d'utilisateurs
				res.writeHead(302, {
					Location: `/users`
				});
				res.end();
			});
			return;
		}
	}

	// Page des utilisateurs
	if (url === 'users') {
		console.log(users);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const usersPage = getUsersPage(users);
		res.write(usersPage);
		res.end();
		return;
	}
};

const app = http.createServer(server);

app.listen(APP_PORT, APP_HOST, () => {
	console.log(`Server running at http://${APP_HOST}:${APP_PORT}`);
});
