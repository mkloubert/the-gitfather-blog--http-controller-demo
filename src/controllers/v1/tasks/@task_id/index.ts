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
    DELETE,
    Describe,
    GET,
    IHttpRequest,
    IHttpResponse,
    Import,
    It,
    JSONSchema7,
    PATCH,
    json,
    validateAjv
} from "@egomobile/http-server";
import { NotFoundError } from "../../../../errors/notFoundError";
import type TaskRepository from "../../../../repositories/taskRepository";

interface IUpdateTaskBody {
    status?: "new" | "done" | null;
    title?: string | null;
}

const updateTaskBodySchema: JSONSchema7 = {
    "type": "object",
    "properties": {
        "status": {
            "type": ["null", "string"],
            "enum": ["new", "done"]
        },
        "title": {
            "type": ["null", "string"]
        }
    }
};

@Controller()
@Describe()
export default class TaskV1Controller extends ControllerBase {
    @Import()
    public readonly tasks!: TaskRepository;


    @GET({
        "path": "/"
    })
    @It("should return 200", Symbol("test #1"))
    @It("should return 404", Symbol("test #2"))
    public async getTaskById(request: IHttpRequest, response: IHttpResponse) {
        try {
            const taskId = request.params!.task_id;
            const task = await this.tasks.getById(taskId);

            apiResponse(request, response)
                .withData(task)
                .send();
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                apiResponse(request, response)
                    .noSuccess()
                    .withStatus(404)
                    .addMessage({
                        "code": 40400,
                        "type": "error",
                        "internal": true,
                        "message": error.message
                    })
                    .send();
            }
            else {
                throw error;  // unknown => re-throw
            }
        }
    }

    @PATCH({
        "path": "/",
        "use": [json(), validateAjv(updateTaskBodySchema)]
    })
    @It("should return 200", Symbol("test #1"))
    @It("should return 404", Symbol("test #2"))
    public async updateTaskById(request: IHttpRequest, response: IHttpResponse) {
        const body = request.body as IUpdateTaskBody;

        try {
            const taskId = request.params!.task_id;
            const task = await this.tasks.updateById(taskId, body);

            apiResponse(request, response)
                .withData(task)
                .send();
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                apiResponse(request, response)
                    .noSuccess()
                    .withStatus(404)
                    .addMessage({
                        "code": 40400,
                        "type": "error",
                        "internal": true,
                        "message": error.message
                    })
                    .send();
            }
            else {
                throw error;  // unknown => re-throw
            }
        }
    }

    @DELETE({
        "path": "/"
    })
    @It("should return 204", Symbol("test #1"))
    @It("should return 404", Symbol("test #2"))
    public async deleteTaskById(request: IHttpRequest, response: IHttpResponse) {
        try {
            const taskId = request.params!.task_id;
            await this.tasks.deleteById(taskId);

            response.writeHead(204, {
                "Content-Type": "text/plain; charset=UTF-8",
                "Content-Length": "0"
            });
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                apiResponse(request, response)
                    .noSuccess()
                    .withStatus(404)
                    .addMessage({
                        "code": 40400,
                        "type": "error",
                        "internal": true,
                        "message": error.message
                    })
                    .send();
            }
            else {
                throw error;  // unknown => re-throw
            }
        }
    }
}
