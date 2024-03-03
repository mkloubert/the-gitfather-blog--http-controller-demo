import { withPostgres } from "../databases/postgres";
import { Task } from "../databases/postgres/entities/default";

export interface ICreateTaskOptions {
    title: string;
}

export interface ITaskView {
    id: string;
    status: string;
    time: string;
    title: string;
}

export default class TaskRepository {
    create(options: ICreateTaskOptions): Promise<ITaskView> {
        return withPostgres("default", async (context) => {
            let newTask = new Task();
            newTask.status = "new";
            newTask.title = options.title;

            newTask = await context.insert(newTask);

            return this.toView(newTask);
        });
    }

    getAll(): Promise<ITaskView[]> {
        return withPostgres("default", async (context) => {
            const allTaskEntities = await context.find(Task, {
                "sort": {
                    "time": "DESC"
                }
            });

            return Promise.all(
                allTaskEntities.map((taskEntity) => {
                    return this.toView(taskEntity);
                })
            );
        });
    }

    async toView(taskEntity: Task): Promise<ITaskView> {
        return {
            "id": taskEntity.uuid,
            "status": taskEntity.status,
            "time": taskEntity.time.toISOString(),
            "title": taskEntity.title
        };
    }
}
