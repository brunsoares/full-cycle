package LiskovSustitutionPrinciple;

/**
 * Classe filha que estende a classe pai LSP_Errado_PAI.
 * Este exemplo demonstra uma violação do Princípio de Substituição de Liskov
 * (LSP). Para que o LSP seja respeitado, a classe filha deve ser capaz de
 * substituir a classe pai sem alterar o comportamento esperado do programa. No
 * entanto, neste caso, a classe filha sobrescreve o método "metodo" da classe
 * pai, o que pode levar a resultados inesperados quando objetos da classe filha
 * são usados no lugar de objetos da classe pai.
 */
public class LSP_Errado_FILHO extends LSP_PAI {
    public void metodo() {
        System.out.println("Método da classe filho");
    }

}
