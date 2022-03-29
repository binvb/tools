interface Task {
    (): Promise<any>;
}
declare function addQueue(event: Task): void;
export default addQueue;
