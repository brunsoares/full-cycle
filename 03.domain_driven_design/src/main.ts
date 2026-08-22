import Address from './entities/address';
import { Customer } from './entities/customer';
import { Order } from './entities/order';
import { OrderItems } from './entities/order-items';

/** Fluxo de criação de um cliente com endereço e ativação do cliente */
// Criamos o cliente sem endereço
let customer = new Customer('123', 'John Doe');
// Criamos o endereço
let address = new Address('123 Main St', 'New York', 'NY', '10001');
// Vinculamos o endereço ao cliente
customer.changeAddress(address);
// Ativamos o cliente
customer.activate();

/** Fluxo de criação da ordem e os itens da ordem */
// Criamos os pedidos
const item1 = new OrderItems('1', 'Item 1', 10);
const item2 = new OrderItems('2', 'Item 2', 20);
// Criamos a ordem
const order = new Order('1', customer['_id']);
// Vinculamos os itens à ordem
order.addItem(item1);
order.addItem(item2);
// Calculamos o total da ordem
order.total();
