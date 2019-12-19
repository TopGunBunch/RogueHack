export default abstract class BaseMotionController {
    /**
     * Cписок функций, которые нужно выполнить при свершении события.
     */
    private toDoList: any = [];

    /**
     * Методы управления подпиской.
     */
    public attach(observerFunc: any): void {
        this.toDoList.push(observerFunc);
    }

    public detach(observer: any): void {
        const observerIndex = this.toDoList.indexOf(observer);
        this.toDoList.splice(observerIndex, 1);
    }

    /**
     * Запуск обновления в каждом подписчике.
     */
    public notify(): void {
        for (const functionToDo of this.toDoList) {
            functionToDo();
        }
    }

    public abstract checkIfKeyWasPressed(engine: any): void;
}
