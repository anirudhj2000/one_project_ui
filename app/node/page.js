'use client'
import React from "react";
import Chat from "@/components/chatui";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import NodeDetails from "@/components/nodeDetails";
import axios from 'axios'


import 'reactflow/dist/style.css';

// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//     { id: '3', position: { x: 100, y: 0 }, data: { label: '3' } },
//     { id: '4', position: { x: 100, y: 100 }, data: { label: '4' } },
//     { id: '5', position: { x: -100, y: 100 }, data: { label: '5' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e1-2', source: '1', target: '3' }, { id: 'e1-2', source: '1', target: '4' }, { id: 'e1-2', source: '1', target: '2' }];



const Node = () => {

    const [search, setSearch] = React.useState('')
    const [isNodeOpen, setIsNodeOpen] = React.useState(false)

    const [nodeData, setNodeData] = React.useState()

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const handleNodeOpen = () => {
        setIsNodeOpen(!isNodeOpen);
    }

    const onNodeClick = (event, node) => {
        // Handle node click here
        setNodeData(node);
        handleNodeOpen();
    };

    const GetPromptResult = () => {
        try {
            axios.post('http://127.0.0.1:8000/flows/prompt', {
                string: search
            }).then((res) => {
                HandleResponse(res.data)
            })
        }
        finally {

        }
    }

    const HandleResponse = (data) => {
        let listNodes = [];
        let listEdge = [];

        data.nodes.map((item) => {
            listNodes.push(item)
        })

        data.edges.map((item) => {
            listEdge.push(item);
        })

        console.log("lalala", listNodes, listEdge)

        setNodes(listNodes)
        setEdges(listEdge)
    }


    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    return (
        <div className="w-screen h-screen">
            <div
                className="absolute inset-0 h-full w-full bg-[#091f12] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}

                />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5/12">

                <div className="my-8">
                    <Chat text={search} onChange={handleInputChange} onSubmit={() => { GetPromptResult() }} onClear={() => { setSearch('') }} />
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-screen w-64 bg-gray-200 transition-transform duration-500 transform ${isNodeOpen ? '-translate-x-0' : 'translate-x-full'}`}>
                <NodeDetails nodeData={nodeData} isNodeOpen={isNodeOpen} handleNodeOpen={handleNodeOpen} />
            </div>
        </div>
    )
}

export default Node