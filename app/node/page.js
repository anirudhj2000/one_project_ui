"use client";
import React, { useCallback } from "react";
import Chat from "@/components/chatui";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdg,
  MiniMap,
  useReactFlow,
  Controls,
} from "reactflow";
import NodeDetails from "@/components/nodeDetails";
import Loader from "@/components/loader";
import "reactflow/dist/style.css";
import { GetPromptResult, PostPrompt, PostPrompts } from "@/service/promtsAPI";
import { sampleResponse } from "@/utils/consts";
import RippleLoader from "@/components/rippleLoader";
import Sidebar from "@/components/sidebar";
import { animate } from "popmotion";

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
  const reactFlowInstance = useReactFlow();
  const [rfInstance, setRfInstance] = React.useState(null);

  const handleSearch = (event) => {
    searchRef.current = event.target.value;
    setSearch(event.target.value);
  };

  const onLoad = useCallback((instance) => {
    reactFlowInstance.fitView();
    setRfInstance(instance);
  }, []);

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

  const handleTransform = (transform) => () => {
    console.log("called animate");
    const {
      position: [x, y],
      zoom,
    } = rfInstance.toObject();

    animate({
      from: { x: x, y: y, zoom },
      to: transform,
      duration: 500,
      onUpdate: ({ x, y, zoom }) => rfInstance.setTransform({ x, y, zoom }),
    });
  };

  const handleNodeOpen = () => {
    setIsNodeOpen(!isNodeOpen);
  };

  const onNodeClick = (event, node) => {
    // Handle node click here
    setNodeData(node);
    handleNodeOpen();
  };

  const postPromptResult = () => {
    window.removeEventListener("keydown", handleKeyDown, true);

    if (searchRef.length == 0) {
      console.log("here");
      return;
    }

    if (nodes.length > 0) {
      console.log("there");
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
        setLoading(!loading);
        setShow(true);
      });
  };

  const generatePromptResult = (id) => {
    GetPromptResult(id).then((res) => {
      HandleResponse(res.data, id);
    });
  };

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
      reactFlowInstance.fitView();
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
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-500">
      <div className="absolute inset-0 h-full w-full bg-[#121212] bg-[linear-gradient(to_right,#ce8fff11_1px,transparent_1px),linear-gradient(to_bottom,#ce8fff11_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          onLoad={onLoad}
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
            className="my-2 w-full  shadow-xl shadow-[#c072fc44]"
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
      ) : loading ? (
        <div className="absolute inset-0 h-full w-full bottom-1/2 left-1/2 transform -translate-x-1/2 z-10">
          <RippleLoader />
        </div>
      ) : null}

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
      <div
        className={`fixed top-2 left-2 h-screen pb-6 w-3/12 bg-transparent transition-transform duration-500 transform drop-shadow-2xl rounded-xl ${
          false ? "translate-x-0" : "-translate-x-full hidden"
        }`}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default Node;