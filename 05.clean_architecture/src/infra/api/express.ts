import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { CustomerModel } from '../customer/repositories/sequelize/customer.model';
import { customerRoute } from './routes/customer.route';

export const app: Express = express(); // Criando uma instância do Express para gerenciar as rotas e requisições HTTP
app.use(express.json()); // Utilizando JSON como formato de entrada e saída para as requisições HTTP
app.use('/customer', customerRoute); // Registrando a rota de Customer no caminho /api/customers

export let sequelize: Sequelize; // Variável para armazenar a instância do Sequelize, que será inicializada posteriormente

/**
 * Função para configurar o banco de dados em memória usando Sequelize e SQLite
 */
async function setupDb(): Promise<void> {
	sequelize = new Sequelize({
		dialect: 'sqlite', // Definindo o dialeto do banco de dados como SQLite
		storage: ':memory:', // Armazenando o banco de dados em memória para testes
		logging: false, // Desativando logs do Sequelize para evitar poluição no console durante os testes
	});
	await sequelize.addModels([CustomerModel]); // Adicionando o modelo CustomerModel ao Sequelize
	await sequelize.sync(); // Sincronizando os modelos com o banco de dados, criando as tabelas necessárias
}

setupDb(); // Chamando a função para configurar o banco de dados em memória
