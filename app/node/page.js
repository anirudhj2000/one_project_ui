'use client'
import React from "react";
import Chat from "@/components/chatui";
import ReactFlow, { useNodesState, useEdgesState, addEdg,MiniMap,Controls } from 'reactflow';
import NodeDetails from "@/components/nodeDetails";
import Loader from "@/components/loader";
import 'reactflow/dist/style.css';
import { GetPromptResult,PostPrompts } from "@/service/promtsAPI";
import { sampleResponse } from "@/utils/consts";

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

    

    const postPromptResult = () => {
        // setLoading(true)
        // setShow(false)
        // PostPrompts(search).then((res) => {
            // HandleResponse(res.data)
            generatePromptResult('')
        // })
    }

    const generatePromptResult = (id) => {
       
        GetPromptResult(id).then((res) => {
            HandleResponse(sampleResponse, id)
        })
    }

    const HandleResponse = (data, id) => {
        let listNodes = [];
        let listEdge = [];
        let root = {x:data.length*150,y:200};

        let list= data

        list.map((rootNode,rootIndex) => {
            if(rootIndex == 0){
                listNodes.push({ id: rootNode.id, position: root, data: { label: search } })
            }

            let parentNodeRes = {}
            if(rootIndex != 0){
                list.map((res) => {
                        res.responses.map((res1) => {
                            if(res1.response_id == rootNode.parent_response_id){
                                parentNodeRes = res1
                            }
                        })
                })
            }
            else{
                parentNodeRes = rootNode
            }

            let parentNode = listNodes.find((item) => item.id == (rootIndex == 0 ? parentNodeRes.id :  parentNodeRes.response_id))

            
            rootNode.responses.map((node,nodeIndex) => {
                 
                let obj = { id: node.response_id, position: { x:parentNode.position.x/2 +  300 * (nodeIndex), y:parentNode.position.y + 400  }, data: { label: node.response_string } };
                listNodes.push(obj)

                listEdge.push({ id: `e1-${node.response_id}`, source: parentNode.id, target: node.response_id})
            })
        })

        setNodes([...nodes, ...listNodes])
        setEdges([...edges, ...listEdge])
        setSearch("")
        setLoading(false)
    }

    const handleSubPromptData = (subPromptData) => {
        GetPromptResult(res.data.id)
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
                {nodes.length > 0 ? <Controls/> :null}
                {nodes.length > 0 ?  <MiniMap style={{height:80,width:120,background:'#000'}}/> :null}
                </ReactFlow>
            </div>
            {show ? <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-5/12">
                <div className="my-2">
                    <Chat text={search} onChange={handleInputChange} onSubmit={() => {postPromptResult()}}  />
                </div>
            </div> : loading ?  <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 z-10"><Loader/></div> : null}
            
            <div className={`fixed top-0 right-0 h-screen w-4/12 bg-gray-200 transition-transform duration-500 transform drop-shadow-2xl ${isNodeOpen ? '-translate-x-0' : 'translate-x-full hidden'}`}>
                <NodeDetails nodeData={nodeData} isNodeOpen={isNodeOpen} handleNodeOpen={handleNodeOpen} handleSubPromptData={handleSubPromptData} />
            </div>
        </div>
    )
}

export default Node