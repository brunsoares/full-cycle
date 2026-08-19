const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
const listNames = [
	'Bruno',
	'Maria',
	'João',
	'Ana',
	'Carlos',
	'Fernanda',
	'Lucas',
	'Juliana',
	'Rafael',
	'Camila',
];

app.get('/', (req, res) => {
	connectToDatabase().then((connection) => {
		createTable(connection).then(() => {
			getNames(connection).then((names) => {
				res.send(
					`<h1>Full Cycle Rocks!</h1><ul>${names.map((name) => `<li>${name}</li>`).join('')}</ul>`,
				);
			});
		});
	});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`App listening on port ${port}`);
	connectToDatabase().then((connection) => {
		console.log('Database ', connection);
		if (connection) {
			createTable(connection)
				.then(() => {
					console.log('Database connected and table created successfully');
				})
				.catch((err) => {
					console.error('Error creating table:', err);
				});
		}
	});
});

async function connectToDatabase() {
	while (true) {
		try {
			const connection = await mysql.createConnection({
				host: 'db',
				user: 'sa',
				password: 'pass',
				database: 'database',
			});
			await connection.connect();
			console.log('Connected to the database', connection.threadId);
			return connection;
		} catch (err) {
			console.error('Error connecting to the database:', err);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
}

async function createTable(connection) {
	await connection.execute(
		'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)',
	);
	console.log('Table created successfully');
	insertName(connection);
}

async function insertName(connection) {
	const randomIndex = Math.floor(Math.random() * listNames.length);
	const name = listNames[randomIndex];
	await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
	console.log(`Inserted name: ${name}`);
}

async function getNames(connection) {
	const [rows] = await connection.execute('SELECT name FROM people');
	return rows.map((row) => row.name);
}
