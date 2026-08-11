package InterfaceSegregationPrinciple;

/**
 * Classe que implementa a interface AveCorreto, demonstrando a aplicação
 * correta do princípio da segregação de interfaces.
 * 
 * A interface AveCorreto estende a interface AnimalCorreto, que possui apenas
 * os métodos eat() e sleep(), que são aplicáveis a todos os tipos de animais. A
 * interface AveCorreto adiciona o método fly(), que é específico para aves.
 */
public class ISP_Correto implements AveCorreto {
    @Override
    public void eat() {
        System.out.println("Comendo...");
    }

    @Override
    public void sleep() {
        System.out.println("Dormindo...");
    }

    @Override
    public void fly() {
        System.out.println("Voando...");
    }

}
