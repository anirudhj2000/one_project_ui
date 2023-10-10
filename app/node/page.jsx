"use client";
import React, { useCallback } from "react";
import Chat from "@/components/chatui";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  useReactFlow,
  Controls,
} from "reactflow";
import NodeDetails from "@/components/nodeDetails";
import Loader from "@/components/loader";
import "reactflow/dist/style.css";
import { GetPromptResult, PostPrompt } from "@/service/promtsAPI";
import { sampleResponse } from "@/utils/consts";
import RippleLoader from "@/components/rippleLoader";
import Sidebar from "@/components/sidebar";
import { animate } from "popmotion";
import StarLoader from "../../components/starLoader";
import Feedback from "../../components/feedback";

const Node = () => {
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef(search);
  const [isNodeOpen, setIsNodeOpen] = React.useState(false);
  const [nodeData, setNodeData] = React.useState();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rootId, setRootId] = React.useState("");
  const [animatedEdge, setAnimatedEdge] = React.useState('')
  const reactFlowInstance = useReactFlow();

  const handleSearch = (event) => {
    searchRef.current = event.target.value;
    setSearch(event.target.value);
  };

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      postPromptResult();
    }
  };


  const handleNodeOpen = (id) => {
    setIsNodeOpen(!isNodeOpen);
    handleNodeAnimation()
  };

  const onNodeClick = (event, node) => {
    // Handle node click here
   
    console.log("handle node click",node)
    handleNodeAnimation('add',node)
    setNodeData(node);
  };

  const handleNodeAnimation = (mode,node) => {
    console.log("props",mode,node)
    if(mode == 'add'){
      // setLoading(true)
        console.log("add")
        reactFlowInstance.fitBounds({x:node.position.x,y:node.position.y - 200,width:400,height:600},{duration:500})
        let edgeList = [...edges];
        setAnimatedEdge(node.id)
        edgeList.forEach((item) => {
          if(item.target == node.id){
            console.log("here111")
            item["animated"] = true
          }
          else{
            item["animated"] = false
          }
        })
        setEdges(edgeList)
        setIsNodeOpen(true);
    }
    else{
      console.log("nope")
      // setLoading(false)
      reactFlowInstance.fitView({duration:500})
      let edgeList = [...edges];
      edgeList.forEach((item) => {
        if(item.target == animatedEdge){
          item["animated"] = false
        }
      })
      setEdges(edgeList)
      setAnimatedEdge("")
    }
  }

  const postPromptResult = () => {
    window.removeEventListener("keydown", handleKeyDown, true);

    if (searchRef.current.length == 0) {
      console.log("here");
      setLoading(false);
      return;
    }

    if (nodes.length > 0) {
      console.log("there");
      setLoading(false);
      return;
    }

    setLoading(true);
    setShow(false);
    let searchStr = search;
    let obj = {
      string: searchRef.current,
    };

    PostPrompt(obj)
      .then((res) => {
        // HandleResponse(res.data)
        generatePromptResult(res.data.prompt_id);
        localStorage.setItem("root", res.data.prompt_id);
      })
      .catch((err) => {
        console.log("err");
        setLoading(false);
        setShow(true);
      });
  };

  const generatePromptResult = (id) => {
    GetPromptResult(id).then((res) => {
      HandleResponse(res.data, id);
    }).catch(() => setLoading(false));
  };

  const handleTransform = (transform) => {
      const obj = reactFlowInstance.toObject();

      console.log("called animate",obj,transform)

      animate({
        from: { x: obj.viewport.x, y: obj.viewport.y, zoom : obj.viewport.zoom },
        to: transform,
        duration:500,
        onUpdate: ({ x, y, zoom }) => reactFlowInstance.fitView({duration:500}),
      });
    }


  const HandleResponse = (data, id) => {
    let listNodes = [];
    let listEdge = [];
    let root = { x: data[0].responses.length * 150, y: 200 };

    let list = data;

    list.map((rootNode, rootIndex) => {
      if (rootIndex == 0) {
        listNodes.push({
          id: rootNode.id,
          position: root,
          data: { label: searchRef.current },
        });
      }

      let parentNodeRes = {};
      if (rootIndex != 0) {
        list.map((res) => {
          res.responses.map((res1) => {
            if (res1.response_id == rootNode.parent_response_id) {
              parentNodeRes = res1;
            }
          });
        });
      } else {
        parentNodeRes = rootNode;
      }

      let parentNode = listNodes.find(
        (item) =>
          item.id ==
          (rootIndex == 0 ? parentNodeRes.id : parentNodeRes.response_id)
      );

      rootNode.responses.map((node, nodeIndex) => {
        let obj = {
          id: node.response_id,
          position: {
            x: parentNode.position.x / 2 + 300 * nodeIndex,
            y: parentNode.position.y + 400,
          },
          data: { label: node.response_string },
        };
        listNodes.push(obj);

        listEdge.push({
          id: `e1-${node.response_id}`,
          source: parentNode.id,
          target: node.response_id,
        });
      });
    });

    setNodes([...nodes, ...listNodes]);
    setEdges([...edges, ...listEdge]);
    setSearch("");
    setTimeout(() => {
        console.log("timeout done")
        handleTransform({ x: 0, y: 0, zoom: 1 })
    }, 250);
    setLoading(false);
  };

  const handleSubPromptData = () => {
    generatePromptResult(localStorage.getItem("root"));
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="w-screen max-h-screen">
      <div className={`w-screen h-screen absolute z-0 `}>
        {
        show ?  
        <StarLoader speed={4}/> 
          :  
          loading ?  
          <StarLoader speed={4}/> : 
          <StarLoader speed={6}/> 
        }
       </div>
      <div className={`absolute inset-0 h-full w-full bg-[#1f1f1f99] bg-[linear-gradient(to_right,#ce8fff11,transparent_1px),linear-gradient(to_bottom,#ce8fff11,transparent_1px)] bg-[size:24px_24px]`}></div>
      <div style={{ width: "100vw", height: "100vh",background:'#c7c7c700'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          {nodes.length > 0 ? <Controls /> : null}
          {nodes.length > 0 ? (
            <MiniMap style={{ height: 80, width: 120, background: "#000" }} />
          ) : null}
        </ReactFlow>
      </div>
      {show ? (
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 xl:w-5/12 md:w-8/12 sm:w-10/12">
          <div
            id="chat-listeners"
            className="my-2 z-10 w-full shadow-[0_0px_500px_-8px_#9000ff]"
          >
            <Chat
              title={"Start"}
              text={search}
              onChange={handleSearch}
              onSubmit={() => {
                postPromptResult();
                
              }}
            />
          </div>
        </div>
      ) 
      : null}

      <div
        className={`fixed top-2 right-2 h-screen pb-4 w-3/12 bg-transparent transition-transform duration-500 transform drop-shadow-2xl rounded-xl ${
          isNodeOpen ? "-translate-x-0" : "translate-x-full hidden"
        }`}
      >
        <NodeDetails
          nodeData={nodeData}
          isNodeOpen={isNodeOpen}
          handleNodeOpen={handleNodeOpen}
          handleSubPromptData={handleSubPromptData}
          handleLoading={() => {
            setLoading(true);
          }}
        />
      </div>


      {!loading ? <div
        className={`fixed top-2 left-2 h-screen pb-6  bg-transparent drop-shadow-2xl rounded-xl w-[70px] transition-all duration-100 ease-in-out hover:w-[250px]`}
      >
        <Sidebar />
      </div>:null}
      {!isNodeOpen ? <div
        className={`absolute z-0 right-0 bottom-0 pb-6 mr-6  bg-transparent drop-shadow-2xl rounded-xl w-[80px] h-[60px] transition-all duration-300 ease-in-out hover:w-[500px] hover:h-[300px]`}
      >
        <Feedback/>
      </div> :null}
    </div>
  );
};

export default Node;