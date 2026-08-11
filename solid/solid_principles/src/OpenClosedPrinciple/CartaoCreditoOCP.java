package OpenClosedPrinciple;

/**
 * Classe que representa o pagamento com cartão de crédito.
 * Esta classe segue o princípio do aberto/fechado (OCP) ao estender a classe
 * abstrata OCP_Correto.
 */
public class CartaoCreditoOCP extends OCP_Correto {
    @Override
    void processarPagamento() {
        System.out.println("Processando pagamento com cartão de crédito");
    }

}
