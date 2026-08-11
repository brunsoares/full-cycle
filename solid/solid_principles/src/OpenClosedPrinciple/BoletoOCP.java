package OpenClosedPrinciple;

/**
 * Classe que representa o pagamento com boleto.
 * Esta classe segue o princípio do aberto/fechado (OCP) ao estender a
 */
public class BoletoOCP extends OCP_Correto {
    @Override
    void processarPagamento() {
        System.out.println("Processando pagamento com boleto");
    }

}
