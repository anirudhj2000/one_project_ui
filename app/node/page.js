'use client'
import React from "react";
import Chat from "@/components/chatui";
import ReactFlow, { useNodesState, useEdgesState, addEdg,MiniMap,Controls } from 'reactflow';
import NodeDetails from "@/components/nodeDetails";

import 'reactflow/dist/style.css';
import { GetPromptResult } from "@/service/promtsAPI";

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
    const [show, setShow] = React.useState(true)
    const [loading,setLoading] = React.useState(false)

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const handleNodeOpen = () => {
        setIsNodeOpen(!isNodeOpen);
    }

    const onNodeClick = (event, node) => {
        // Handle node click here
        setNodeData(node);
        handleNodeOpen();
    };

    React.useEffect(() => {
       window.addEventListener('keydown', handleKeyDown);
    },[])
    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            generatePromptResult()
        }
                
    };

    const generatePromptResult = () => {
        setLoading(true)
        setShow(false)
        GetPromptResult(search).then((res) => {
            HandleResponse(res.data)
            
        })
    }

    const HandleResponse = (data) => {
        let listNodes = [];
        let listEdge = [];

        listNodes.push({ id: '1', position: { x: 500 , y: 200  }, data: { label: search } })

        data.nodes.map((item, index) => {
            let obj = { id: (index + 2) + '', position: { x: index * 200, y: 600  }, data: { label: item } }

            listNodes.push(obj)
            listEdge.push({ id: `e1-${index + 2}`, source: '1', target: (index + 2) + '' })
        })

        console.log("node", listEdge, listNodes)


        setNodes([...nodes, ...listNodes])
        setEdges([...edges, ...listEdge])
        setLoading(false)
    }

    const handleSubPromptData = (subPromptData) => {
        console.log(subPromptData)
        HandleResponse(subPromptData.data)
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
                    fitView

                >
                <Controls/>
                {nodes.length > 0 ?  <MiniMap/> :null}
                </ReactFlow>
            </div>
            {show ? <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-5/12">
                <div className="my-2">
                    <Chat text={search} onChange={handleInputChange} onSubmit={() => generatePromptResult()} onClear={() => { setSearch('') }} />
                </div>
            </div> : loading ?   <></> : null}
            <div className={`fixed top-0 right-0 h-screen w-4/12 bg-gray-200 transition-transform duration-500 transform drop-shadow-2xl ${isNodeOpen ? '-translate-x-0' : 'translate-x-full hidden'}`}>
                <NodeDetails nodeData={nodeData} isNodeOpen={isNodeOpen} handleNodeOpen={handleNodeOpen} handleSubPromptData={handleSubPromptData} />
            </div>
        </div>
    )
}

export default Node