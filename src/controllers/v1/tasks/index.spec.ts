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
    BeforeEachTestFunc,
    TestSpecItem
} from "@egomobile/http-server";
import { withPostgres } from "../../../databases/postgres";
import { Task } from "../../../databases/postgres/entities/default";

// this is executed BEFORE each to to keep sure
// that there is no data in the database when running tests
export const beforeEach: BeforeEachTestFunc = async () => {
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
