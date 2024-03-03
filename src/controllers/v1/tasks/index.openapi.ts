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
                                    "totalCount": 0,
                                    "limit": 0,
                                    "items": [

                                    ]
                                },
                                "messages": [

                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};
