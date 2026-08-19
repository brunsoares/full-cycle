package InterfaceSegregationPrinciple;

/**
 * Classe que implementa a interface AnimalErrado, demonstrando a violação do
 * princípio da segregação de interfaces.
 * 
 * O problema aqui é que a interface AnimalErrado possui métodos que não são
 * aplicáveis a todos os tipos de animais, como fly() e swim(). Isso força as
 * classes que implementam essa interface a fornecer implementações para métodos
 * que podem não fazer sentido para elas, violando o princípio da segregação de
 * interfaces.
 */
public class ISP_Errado implements AnimalErrado {
    @Override
    public void eat() {
        System.out.println("Comendo...");
    }

    @Override
    public void fly() {
        System.out.println(
                "Animal não pode voar, mas o método está presente na interface, violando o princípio da segregação de interfaces.");
    }

    @Override
    public void swim() {
        System.out.println(
                "Animal não pode nadar, mas o método está presente na interface, violando o princípio da segregação de interfaces.");
    }

    @Override
    public void sleep() {
        System.out.println("Dormindo...");
    }

}
