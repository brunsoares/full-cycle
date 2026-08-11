package LiskovSustitutionPrinciple;

/**
 * Classe filha que estende a classe pai LSP_Correto_PAI.
 * Este exemplo demonstra a correta implementação do Princípio de Substituição
 * de Liskov (LSP). A classe filha sobrescreve o método "metodo" da classe pai,
 * mas mantém o
 * comportamento esperado do programa. Isso significa que objetos da classe
 * filha podem ser usados no lugar de objetos da classe pai sem causar
 * resultados inesperados.
 */
public class LSP_Correto_FILHO extends LSP_PAI {
    @Override
    public void metodo() {
        System.out.println("Método da classe filho");
    }

}
