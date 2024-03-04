import { withPostgres } from "../databases/postgres";
import { Task } from "../databases/postgres/entities/default";
import { NotFoundError } from "../errors/notFoundError";

export interface ICreateTaskOptions {
    title: string;
}

export interface IUpdateTaskOptions {
    status?: "new" | "done" | null;
    title?: string | null;
}

export interface ITaskView {
    createdAt: string;
    id: string;
    status: string;
    title: string;
    updatedAt: string | null;
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

    deleteById(taskId: string): Promise<void> {
        return withPostgres("default", async (context) => {
            let entity = await context.findOne(Task, {
                "where": "uuid = $1",
                "params": [taskId.toLowerCase().trim()]
            });

            if (!entity) {
                throw new NotFoundError(`Task with ID ${taskId} not found`);
            }

            await context.remove(entity);
        });
    }

    getAll(): Promise<ITaskView[]> {
        return withPostgres("default", async (context) => {
            const allTaskEntities = await context.find(Task, {
                "sort": {
                    "created_at": "DESC"
                }
            });

            return Promise.all(
                allTaskEntities.map((taskEntity) => {
                    return this.toView(taskEntity);
                })
            );
        });
    }

    getById(taskId: string): Promise<ITaskView> {
        return withPostgres("default", async (context) => {
            const entity = await context.findOne(Task, {
                "where": "uuid = $1",
                "params": [taskId.toLowerCase().trim()]
            });

            if (!entity) {
                throw new NotFoundError(`Task with ID ${taskId} not found`);
            }

            return this.toView(entity);
        });
    }

    async toView(taskEntity: Task): Promise<ITaskView> {
        return {
            "createdAt": taskEntity.created_at.toISOString(),
            "id": taskEntity.uuid,
            "status": taskEntity.status,
            "title": taskEntity.title,
            "updatedAt": taskEntity.updated_at?.toISOString() || null
        };
    }

    updateById(taskId: string, options: IUpdateTaskOptions): Promise<ITaskView> {
        return withPostgres("default", async (context) => {
            let entity = await context.findOne(Task, {
                "where": "uuid = $1",
                "params": [taskId.toLowerCase().trim()]
            });

            if (!entity) {
                throw new NotFoundError(`Task with ID ${taskId} not found`);
            }

            if (options.title) {
                entity.title = options.title;
            }
            if (options.status) {
                entity.status = options.status;
            }

            entity.updated_at = new Date();

            entity = await context.update(entity);

            return this.toView(entity);
        });
    }
}
