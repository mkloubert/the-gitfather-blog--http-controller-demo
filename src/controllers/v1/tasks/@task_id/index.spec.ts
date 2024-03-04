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

import type {
    AfterEachTestFunc,
    BeforeEachTestFunc,
    TestSpecItem
} from "@egomobile/http-server";
import { withPostgres } from "../../../../databases/postgres";
import { Task } from "../../../../databases/postgres/entities/default";
import type { ITaskView } from "../../../../repositories/taskRepository";

const task: ITaskView = {
    "id": "bc406c78-c485-4c93-b5b0-6b9cd5b1915c",
    "status": "new",
    "createdAt": "2024-03-04T06:40:54.257Z",
    "title": "My task",
    "updatedAt": null
};

// this is executed BEFORE each test
//
// in this case we want to have an existing task
// with ID `bc406c78-c485-4c93-b5b0-6b9cd5b1915c`
export const beforeEach: BeforeEachTestFunc = async (context) => {
    return withPostgres("default", async (context) => {
        let newTask = new Task();
        newTask.uuid = task.id;
        newTask.status = "new";
        newTask.title = task.title;

        newTask = await context.insert(newTask);
    });
};

// this is executed AFTER each test
//
// in this case we want to keep sure
// that there is no data after tests in this
// file have been executed
export const afterEach: AfterEachTestFunc = async (context) => {
    return withPostgres("default", async (context) => {
        let allTasks = await context.find(Task);

        await context.remove(allTasks);
    });
};


export const getTaskById: TestSpecItem[] = [
    {
        "ref": Symbol("test #1"),
        "expectations": {
            "status": 200,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "parameters": {
            "task_id": task.id
        }
    },
    {
        "ref": Symbol("test #2"),
        "expectations": {
            "status": 404,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "parameters": {
            "task_id": "35d3f327-ba4e-4843-82b9-8ee6716043c2"
        }
    }
];

export const updateTaskById: TestSpecItem[] = [
    {
        "ref": Symbol("test #1"),
        "expectations": {
            "status": 200,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "body": {
            "title": "New Title"
        },
        "parameters": {
            "task_id": task.id
        }
    },
    {
        "ref": Symbol("test #2"),
        "expectations": {
            "status": 404,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "body": {
            "title": "New Title"
        },
        "parameters": {
            "task_id": "35d3f327-ba4e-4843-82b9-8ee6716043c2"
        }
    }
];

export const deleteTaskById: TestSpecItem[] = [
    {
        "ref": Symbol("test #1"),
        "expectations": {
            "status": 204,
            "headers": {
                "content-type": /(text\/plain)/i
            }
        },
        "parameters": {
            "task_id": task.id
        }
    },
    {
        "ref": Symbol("test #2"),
        "expectations": {
            "status": 404,
            "headers": {
                "content-type": /(application\/json)/i
            }
        },
        "parameters": {
            "task_id": "35d3f327-ba4e-4843-82b9-8ee6716043c2"
        }
    }
];
