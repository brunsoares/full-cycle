package DependencyInversionPrinciple;

/**
 * Classe que demonstra a violação do princípio da inversão de dependência.
 * 
 * O problema aqui é que a classe DIP_Errado depende diretamente da classe
 * DIP_Errado2, o que cria um acoplamento forte entre elas. Isso significa que
 * qualquer alteração na classe DIP_Errado2 pode afetar a classe DIP_Errado,
 * tornando o código menos flexível e mais difícil de manter.
 */
public class DIP_Errado {
    private String nome;
    private DIP_Errado2 categoria;

    public DIP_Errado(String nome, DIP_Errado2 categoria) {
        this.nome = nome;
        this.categoria = categoria;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public DIP_Errado2 getCategoria() {
        return new DIP_Errado2();
    }

    public void setCategoria(DIP_Errado2 categoria) {
        this.categoria = categoria;
    }

}
