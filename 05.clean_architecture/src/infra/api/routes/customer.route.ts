import express from 'express'; // Importando o módulo Express para criar rotas e gerenciar requisições HTTP
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repositories/sequelize/customer-repository';
import { FindAllCustomerUseCase } from '../../../usecase/customer/findAll/findAll.customer.usecase';
import { CustomerPresenter } from '../presenters/customer.presenter';

export const customerRoute = express.Router(); // Criando uma instância do Router do Express para gerenciar as rotas relacionadas a Customer

customerRoute.post('/', async (req, res) => {
	const { name, address } = req.body; // Extraindo os dados do corpo da requisição
	const useCase = new CreateCustomerUseCase(new CustomerRepository()); // Criando uma instância do caso de uso CreateCustomerUseCase com o repositório de Customer
	const customerDTO = {
		name,
		address,
	};

	try {
		const customerOutputDTO = await useCase.execute(customerDTO);
		res.status(201).json(customerOutputDTO); // Retornando o resultado do caso de uso com status 201 (Created)
		res.send(customerOutputDTO);
	} catch (error) {
		res.status(400).json({ error: error });
	}
});

customerRoute.get('/', async (req, res) => {
	const useCase = new FindAllCustomerUseCase(new CustomerRepository()); // Criando uma instância do caso de uso CreateCustomerUseCase com o repositório de Customer
	try {
		const customers = await useCase.execute();
		res.format({
			json: () => res.json(customers), // Retornando o resultado do caso de uso em formato JSON
			xml: () => res.send(CustomerPresenter.toXML(customers)), // Retornando o resultado do caso de uso em formato XML
		});
	} catch (error) {
		res.status(400).json({ error: error });
	}
});
