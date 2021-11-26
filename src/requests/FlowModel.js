import axios from "axios"
import { API_URL } from '../config'
const api = API_URL.GRAPHQL
const createURL = API_URL.CREATE

export default {
    async getAll() {
        return mock
    },
    async getAllFromGrapgQL() {
        const query = `{
        query_flowDefinitions{...}
    }`
        const { data } = await axios.post(api, query, {
            headers: {
                'Content-Type': 'text/plain',
            }
        })
        var res = data[Object.keys(data)[0]]
        console.log(res)
        return res
    },
    async getFromGrapgQL(id) {
        const query = `{
        query_flowDefinitions{...}
    }`
        const { data } = await axios.post(api, query, {
            headers: {
                'Content-Type': 'text/plain',
            }
        })
        var res = data[Object.keys(data)[0]][parseInt(id)]
        console.log(res)
        return res
    },
    async createFlowModel(flowmodel) {
        const res = await axios.request({
            url: createURL + '/flowsDefinition',
            method: 'POST',
            data: flowmodel,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        return res
    },
}

var mock = [
    {
        "id": 1000,
        "lifecycle": {
            "schema": {
                "uischema": {
                    "feedback": {
                        "ui:widget": "textarea"
                    }
                },
                "fieldschema": {
                    "type": "object",
                    "title": "外派单",
                    "properties": {
                        "saler": {
                            "enum": [
                                "销售1",
                                "销售2",
                                "销售3"
                            ],
                            "type": "string",
                            "title": "销售员"
                        },
                        "status": {
                            "type": "boolean",
                            "title": "工程师接单"
                        },
                        "manager": {
                            "enum": [
                                "管理员1",
                                "管理员2",
                                "管理员3"
                            ],
                            "type": "string",
                            "title": "管理员"
                        },
                        "feedback": {
                            "type": "string",
                            "title": "客户反馈"
                        },
                        "treasurer": {
                            "enum": [
                                "财务1",
                                "财务2",
                                "财务3"
                            ],
                            "type": "string",
                            "title": "工程师"
                        }
                    },
                    "description": "外派单记录"
                }
            },
            "enkrino": {
                "graph": {
                    "edges": [
                        {
                            "to": "dcd3f8bb-6611-428a-8f64-f1e8ece1a07b",
                            "from": "4fd27190-a751-415e-9dbd-8c9188860656",
                            "spec": {
                                "temporary": false
                            }
                        },
                        {
                            "to": "e8ca1aa2-ac7f-4c28-85fb-6efd44a028f9",
                            "from": "dcd3f8bb-6611-428a-8f64-f1e8ece1a07b",
                            "spec": {
                                "temporary": false
                            }
                        },
                        {
                            "to": "e59e01f5-53cc-4bc5-bd4d-b4a0a6899cdb",
                            "from": "e8ca1aa2-ac7f-4c28-85fb-6efd44a028f9",
                            "spec": {
                                "token": 0,
                                "temporary": false
                            }
                        },
                        {
                            "to": "21f2c4fc-8c4a-4181-a5ed-b8a370a244b2",
                            "from": "e59e01f5-53cc-4bc5-bd4d-b4a0a6899cdb",
                            "spec": {
                                "token": 0,
                                "temporary": false
                            }
                        }
                    ],
                    "nodes": [
                        {
                            "id": "4fd27190-a751-415e-9dbd-8c9188860656",
                            "name": "选定销售员",
                            "backward": 0
                        },
                        {
                            "id": "dcd3f8bb-6611-428a-8f64-f1e8ece1a07b",
                            "name": "选定工程师",
                            "backward": 0
                        },
                        {
                            "id": "e8ca1aa2-ac7f-4c28-85fb-6efd44a028f9",
                            "name": "工程师接单",
                            "backward": 1
                        },
                        {
                            "id": "e59e01f5-53cc-4bc5-bd4d-b4a0a6899cdb",
                            "name": "填写客户反馈",
                            "backward": 0
                        },
                        {
                            "id": "21f2c4fc-8c4a-4181-a5ed-b8a370a244b2",
                            "name": "管理员审核",
                            "backward": 2
                        }
                    ]
                },
                "start": "4fd27190-a751-415e-9dbd-8c9188860656",
            }
        }
    }
]