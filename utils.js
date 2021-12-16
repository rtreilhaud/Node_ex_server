const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

exports.getUsersPage = (userList) => {
	// Début de page
	const start = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Liste des utilisateurs</title>
                <link href="/bootstrap" rel="stylesheet" type="text/css" />
            </head>
            <body class="container">
                <h1>Liste des utilisateurs</h1>
    `;

	// Liste des utilisateurs
	let insert = '<ul>';
	for (const { name, birth } of userList) {
		insert += `<li>${name} (${dayjs(birth).format('DD/MM/YYYY')})</li>`;
	}
	insert += '</ul>';

	// Fin de page
	const end = `
            <a href="/" class="btn btn-primary">Retourner au formulaire</a>
        </body>
    </html>
    `;

	// Retourner la page
	return start + insert + end;
};

exports.getFormData = (data) => {
	// Convertir les données binaires en chaine de caractères
	const string = data.toString();
	// Obtenir les différents paramètres
	const params = string.split('&');
	const user = params.reduce((acc, param) => {
		let [key, value] = param.split('=');
		return { ...acc, [key.trim()]: value.trim() };
	}, {});
	return user;
};
