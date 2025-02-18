import { Surreal } from 'surrealdb.js';

const db = new Surreal('http://127.0.0.1:8000/rpc', {
	// Set the namespace and database for the connection
	ns: 'test',
	db: 'test',

	// Set the authentication details for the connection
	auth: {
		NS: 'test',
		DB: 'test',
		SC: 'user',
		user: 'info@surrealdb.com',
		pass: 'my-secret-password',
	},
});

async function main() {
	try {
		// Create a new person with a random id
		const created = await db.create('person', {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).substr(2, 10),
		});

		// Update a person record with a specific id
		const updated = await db.merge('person:jaime', {
			marketing: true,
		});

		// Select all people records
		const people = await db.select('person');

		// Perform a custom advanced query
		const groups = await db.query(
			'SELECT marketing, count() FROM type::table($tb) GROUP BY marketing',
			{
				tb: 'person',
			}
		);
	} catch (e) {
		console.error('ERROR', e);
	}
}

main();
