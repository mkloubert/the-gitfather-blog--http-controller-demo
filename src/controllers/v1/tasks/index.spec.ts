import type {
    BeforeEachTestFunc,
    TestSpecItem
} from "@egomobile/http-server";
import { withPostgres } from "../../../databases/postgres";
import { Task } from "../../../databases/postgres/entities/default";

export const beforeEach: BeforeEachTestFunc = async (context) => {
    return withPostgres("default", async (context) => {
        let allTasks = await context.find(Task);

        await context.remove(allTasks);
    });
};

export const getAllTasks: TestSpecItem[] = [
    {
        "ref": Symbol("test #1"),
        "expectations": {
            "status": 200,
            "headers": {
                "content-type": /(application\/json)/i
            }
        }
    }
];

export const createNewTask: TestSpecItem[] = [
    {
        "ref": Symbol("test #1"),
        "expectations": {
            "status": 201,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "body": {
            "title": "My new task"
        }
    }
];