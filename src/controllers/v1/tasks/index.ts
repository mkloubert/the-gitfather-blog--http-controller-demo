import { apiResponse } from "@egomobile/api-utils";
import {
    Controller,
    ControllerBase,
    Describe,
    GET,
    IHttpRequest,
    IHttpResponse,
    Import,
    It,
    POST,
    json,
    schema,
    validate
} from "@egomobile/http-server";
import type TaskRepository from "../../../repositories/taskRepository";

interface ICreateTaskBody {
    title: string;
}

const createTaskBodySchema = schema.object({
    "title": schema.string().trim().strict().min(1).required()
}).required();

@Controller()
@Describe()
export default class TasksV1Controller extends ControllerBase {
    @Import()
    public readonly tasks!: TaskRepository;

    @GET({
        "path": "/"
    })
    @It("should return 200", Symbol("test #1"))
    public async getAllTasks(request: IHttpRequest, response: IHttpResponse) {
        const allTasks = await this.tasks.getAll();

        apiResponse(request, response)
            .withList(allTasks)
            .send();
    }

    @POST({
        "path": "/",
        "use": [json(), validate(createTaskBodySchema)]
    })
    @It("should return 201", Symbol("test #1"))
    public async createNewTask(request: IHttpRequest, response: IHttpResponse) {
        const body = request.body as ICreateTaskBody;

        const newTask = await this.tasks.create(body);

        apiResponse(request, response)
            .withStatus(201)
            .withData(newTask)
            .send();
    }
}
