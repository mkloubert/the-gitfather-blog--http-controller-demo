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

export const getTaskById: OpenAPIV3.OperationObject = {
    "summary": "Returns a task by its ID",
    "tags": ["tasks"],
    "parameters": [{
        "in": "path",
        "name": "task_id",
        "required": true,
        "description": "The ID of the task"
    }],
    "responses": {
        "200": {
            "description": "The task by the ID",
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
        },
        "404": {
            "description": "The task was not found by given ID",
            "content": {
                "application/json": {
                    "examples": {
                        "Example #1": {
                            "value": {
                                "success": false,
                                "data": null,
                                "messages": [
                                    {
                                        "code": 40400,
                                        "id": null,
                                        "internal": true,
                                        "message": "Task with ID b50a90f7-c387-d3cd-e014-e2deb6d4c55e not found",
                                        "type": "error"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};

export const updateTaskById: OpenAPIV3.OperationObject = {
    "summary": "Updates a task by its ID",
    "tags": ["tasks"],
    "parameters": [{
        "in": "path",
        "name": "task_id",
        "required": true,
        "description": "The ID of the task"
    }],
    "requestBody": {
        "content": {
            "application/json": {
                "examples": {
                    "Example #1": {
                        "value": {
                            "status": "done"
                        }
                    }
                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "The updated task",
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
                                    "title": "New title",
                                    "updatedAt": "2024-03-04T07:07:50.939Z"
                                },
                                "messages": []
                            }
                        }
                    }
                }
            }
        },
        "404": {
            "description": "The task was not found by given ID",
            "content": {
                "application/json": {
                    "examples": {
                        "Example #1": {
                            "value": {
                                "success": false,
                                "data": null,
                                "messages": [
                                    {
                                        "code": 40400,
                                        "id": null,
                                        "internal": true,
                                        "message": "Task with ID b50a90f7-c387-d3cd-e014-e2deb6d4c55e not found",
                                        "type": "error"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};

export const deleteTaskById: OpenAPIV3.OperationObject = {
    "summary": "Deletes a task by its ID",
    "tags": ["tasks"],
    "parameters": [{
        "in": "path",
        "name": "task_id",
        "required": true,
        "description": "The ID of the task"
    }],
    "responses": {
        "204": {
            "description": "Task has been deleted"
        },
        "404": {
            "description": "The task was not found by given ID",
            "content": {
                "application/json": {
                    "examples": {
                        "Example #1": {
                            "value": {
                                "success": false,
                                "data": null,
                                "messages": [
                                    {
                                        "code": 40400,
                                        "id": null,
                                        "internal": true,
                                        "message": "Task with ID b50a90f7-c387-d3cd-e014-e2deb6d4c55e not found",
                                        "type": "error"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};
