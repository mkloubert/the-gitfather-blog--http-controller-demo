
export class Task {
    public id!: number;
}

export default class TaskRepository {
    async getAll(): Promise<Task[]> {
        return [];
    }
}
