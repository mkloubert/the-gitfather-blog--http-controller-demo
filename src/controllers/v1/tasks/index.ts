import { apiResponse } from "@egomobile/api-utils";
import {
    Controller,
    ControllerBase,
    Describe,
    GET,
    IHttpRequest,
    IHttpResponse,
    Import,
    It
} from "@egomobile/http-server";
import type TaskRepository from "../../../repositories/taskRepository";

@Controller()
@Describe()
export default class TasksV1Controller extends ControllerBase {
    @Import()
    public readonly tasks!: TaskRepository;

    @GET({
        "path": "/"
    })
    @It("should return {{status}} 200 if API key is valid", Symbol("test #1"))
    public async getAllTasks(request: IHttpRequest, response: IHttpResponse) {
        const allTasks = await this.tasks.getAll();

        apiResponse(request, response)
            .withList(allTasks)
            .send();
    }
}
