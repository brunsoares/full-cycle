package SingleResponsibilityPrinciple;

/**
 * Classe que viola o princípio da responsabilidade única (SRP).
 */
public class SRP_Errado {
    private String nome;
    private String email;
    private String telefone;

    public SRP_Errado(String nome, String email, String telefone) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    /**
     * Funções fora do escopo da classe, violando o
     * princípio da responsabilidade única (SRP).
     */

    public void enviarEmail(String mensagem) {
        System.out.println("Enviando email para " + email + ": " + mensagem);
    }

    public void enviarSMS(String mensagem) {
        System.out.println("Enviando SMS para " + telefone + ": " + mensagem);
    }

    public void salvarNoBancoDeDados() {
        System.out.println("Salvando dados no banco de dados: " + nome + ", " + email + ", " + telefone);
    }

    public void gerarRelatorio() {
        System.out.println("Gerando relatório para " + nome);
    }
}
