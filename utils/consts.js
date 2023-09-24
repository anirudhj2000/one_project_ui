export const sampleResponse = [
        {
            "id": "12345678-1234-1234-1234-123456789abc",
            "prompt_string": "Main Prompt 1",
            "parent_response_id": null,
            "child_response_id": null,
            "responses": [
                {
                    "res_id": "87654321-4321-4321-4321-987654321def",
                    "prompt_id": "12345678-1234-1234-1234-123456789abc",
                    "response_string": "Response 1"
                },
                {
                    "res_id": "78901234-5678-5678-5678-123456789ghi",
                    "prompt_id": "12345678-1234-1234-1234-123456789abc",
                    "response_string": "Main Prompt2"
                }
            ]
        },
        {
            "id": "23456789-2345-2345-2345-23456789jklm",
            "prompt_string": "Main Prompt 2",
            "parent_response_id": "78901234-5678-5678-5678-123456789ghi",
            "child_response_id": null,
            "responses": [
                {
                    "res_id": "98765432-8765-8765-8765-987654321opq",
                    "prompt_id": "23456789-2345-2345-2345-23456789jklm",
                    "response_string": "Response 3"
                },
                {
                    "res_id": "56789012-3456-3456-3456-567890123rst",
                    "prompt_id": "23456789-2345-2345-2345-23456789jklm",
                    "response_string": "Response 4"
                }
            ]
        },
    ]