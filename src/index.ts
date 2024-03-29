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

import {
    createServer
} from "@egomobile/http-server";
import { setupTestEventListener } from "@egomobile/http-supertest";
import path from "node:path";
import packageJSON from "../package.json";
import TaskRepository from "./repositories/taskRepository";

async function main() {
    const shouldRunTests = process.env.EGO_RUN_TESTS?.trim() === "1";

    const app = createServer();

    app.controllers({
        "imports": {
            "tasks": new TaskRepository()
        },
        "patterns": "*.+(ts)",
        "rootDir": path.join(__dirname, "controllers"),
        "swagger": {
            "document": {
                "info": {
                    "title": packageJSON.name,
                    "version": packageJSON.version
                }
            },
            "resourcePath": __dirname
        },
        "validateWithDocumentation": false
    });

    if (shouldRunTests) {
        setupTestEventListener({
            "server": app
        });
    }

    // start the server
    await app.listen(process.env.PORT);
    console.log("App now running on port", app.port);
}

main().catch(console.error);
