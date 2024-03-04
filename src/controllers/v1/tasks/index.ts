// MIT License
//
// Copyright (c) 2024 Marcel Joachim Kloubert (https://marcel.coffee)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
