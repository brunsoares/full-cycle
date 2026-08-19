package LiskovSustitutionPrinciple;

/**
 * Classe pai que representa o princípio de substituição de Liskov (LSP).
 * Esta classe é usada como base para demonstrar uma violação e uma
 * implementação correta do LSP.
 */
public class LSP_PAI {
    public void metodo() {
        System.out.println("Método da classe pai");
    }

    public void metodoComportamento() {
        System.out.println("Comportamento da classe pai");
    }
}
