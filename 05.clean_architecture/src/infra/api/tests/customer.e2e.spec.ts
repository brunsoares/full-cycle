import { afterAll, beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { app, sequelize } from '../express';

/**
 * Estrutura de testes End-to-End (E2E) para Customer
 */
describe('[E2E] Use case tests for Customer', () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true }); // Limpa o banco de dados em memória antes de cada teste
	});

	afterAll(async () => {
		await sequelize.close(); // Fecha a conexão com o banco de dados em memória após cada teste
	});

	it('should create a customer', async () => {
		const response = await request(app)
			.post('/customer')
			.send({
				name: 'Customer 1',
				address: {
					street: 'Street 1',
					city: 'City 1',
					state: 'State 1',
					zip: '12345-678',
				},
			});

		// Validando retorno da API
		expect(response.status).toBe(201); // Verifica se o status da resposta é 201 (Created)
		expect(response.body).toEqual({
			id: expect.any(String), // Verifica se o ID é uma string
			name: 'Customer 1',
			address: {
				street: 'Street 1',
				city: 'City 1',
				state: 'State 1',
				zip: '12345-678',
			},
			active: false,
			rewardPoints: 0,
		});
	});

	it('should not create a customer', async () => {
		const response = await request(app).post('/customer').send({
			name: 'Customer 1',
		});
		expect(response.status).toBe(400); // Verifica se o status da resposta é 400 (Bad Request)
	});

	it('should list all customers', async () => {
		// Criação
		const responseCreate1 = await request(app)
			.post('/customer')
			.send({
				name: 'Customer 1',
				address: {
					street: 'Street 1',
					city: 'City 1',
					state: 'State 1',
					zip: '12345-678',
				},
			});

		// Validando retorno da API
		expect(responseCreate1.status).toBe(201); // Verifica se o status da resposta é 201 (Created)

		const responseCreate2 = await request(app)
			.post('/customer')
			.send({
				name: 'Customer 2',
				address: {
					street: 'Street 2',
					city: 'City 2',
					state: 'State 2',
					zip: '23456-789',
				},
			});

		// Validando retorno da API
		expect(responseCreate2.status).toBe(201); // Verifica se o status da resposta é 201 (Created)

		// Listagem
		const responseList = await request(app).get('/customer').send();
		expect(responseList.status).toBe(200); // Verifica se o status da resposta é 200 (OK)
		expect(responseList.body.customers).toHaveLength(2); // Verifica se o corpo da resposta contém 2 clientes
		expect(responseList.body.customers[0]).toEqual({
			id: expect.any(String), // Verifica se o ID é uma string
			name: 'Customer 1',
			address: {
				street: 'Street 1',
				city: 'City 1',
				state: 'State 1',
				zip: '12345-678',
			},
			active: false,
			rewardPoints: 0,
		});
		expect(responseList.body.customers[1]).toEqual({
			id: expect.any(String), // Verifica se o ID é uma string
			name: 'Customer 2',
			address: {
				street: 'Street 2',
				city: 'City 2',
				state: 'State 2',
				zip: '23456-789',
			},
			active: false,
			rewardPoints: 0,
		});
	});
});
