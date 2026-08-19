package DependencyInversionPrinciple;

/**
 * Exemplo de implementação do Princípio da Inversão de Dependência (DIP) em
 * Java.
 * 
 * O DIP afirma que módulos de alto nível não devem depender de módulos de baixo
 * nível. Ambos devem depender de abstrações (interfaces).
 */
public class DIP_Correto {
    private String name;
    private Category category;

    public DIP_Correto(String name, Category category) {
        this.name = name;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
