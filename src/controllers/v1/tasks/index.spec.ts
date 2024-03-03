import type {
    TestSpecItem
} from "@egomobile/http-server";

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
