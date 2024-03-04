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

import type { OpenAPIV3 } from "openapi-types";

export const getAllTasks: OpenAPIV3.OperationObject = {
    "summary": "Returns a list of all tasks",
    "tags": ["tasks"],
    "responses": {
        "200": {
            "description": "The list of tasks",
            "content": {
                "application/json": {
                    "examples": {
                        "Example #1": {
                            "value": {
                                "success": true,
                                "data": {
                                    "offset": 0,
                                    "totalCount": 1,
                                    "limit": 1,
                                    "items": [{
                                        "createdAt": "2024-03-04T06:51:14.688Z",
                                        "id": "a50a90f7-c387-d3cd-e014-e2deb6d4c55e",
                                        "status": "new",
                                        "title": "My new task",
                                        "updatedAt": null
                                    }]
                                },
                                "messages": []
                            }
                        }
                    }
                }
            }
        }
    }
};

export const createNewTask: OpenAPIV3.OperationObject = {
    "summary": "Creates a new task",
    "tags": ["tasks"],
    "requestBody": {
        "description": "The data for the new task",
        "content": {
            "application/json": {
                "examples": {
                    "Example #1": {
                        "value": {
                            "title": "My new Task"
                        }
                    }
                }
            }
        }
    },
    "responses": {
        "201": {
            "description": "The new task",
            "content": {
                "application/json": {
                    "examples": {
                        "Example #1": {
                            "value": {
                                "success": true,
                                "data": {
                                    "createdAt": "2024-03-04T06:51:14.688Z",
                                    "id": "a50a90f7-c387-d3cd-e014-e2deb6d4c55e",
                                    "status": "new",
                                    "title": "My new task",
                                    "updatedAt": null
                                },
                                "messages": []
                            }
                        }
                    }
                }
            }
        }
    }
};
