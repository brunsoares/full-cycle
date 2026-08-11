package OpenClosedPrinciple;

/**
 * Classe que viola o princípio do aberto/fechado (OCP).
 */
public class OCP_Errado {
    private String tipoPagamento;

    public OCP_Errado(String tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    /**
     * Processa o pagamento com base no tipo de pagamento.
     * Este método viola o princípio do aberto/fechado,
     * pois qualquer alteração no tipo de pagamento
     * exigirá a modificação deste método.
     * 
     * @param tipoPagamento
     */
    public void processarPagamento(String tipoPagamento) {
        if (tipoPagamento.equals("cartao")) {
            System.out.println("Processando pagamento com cartão de crédito");
        } else if (tipoPagamento.equals("boleto")) {
            System.out.println("Processando pagamento com boleto");
        } else {
            throw new IllegalArgumentException("Tipo de pagamento inválido");
        }
    }
}
