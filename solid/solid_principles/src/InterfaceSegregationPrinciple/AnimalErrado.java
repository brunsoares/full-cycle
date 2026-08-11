package InterfaceSegregationPrinciple;

/**
 * Classe que representa um animal com métodos que não são aplicáveis a todos os
 * tipos de animais, violando o princípio da segregação de interfaces.
 */
public interface AnimalErrado {
    public void eat();

    public void sleep();

    public void fly();

    public void swim();
}
