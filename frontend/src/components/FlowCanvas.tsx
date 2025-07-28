import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './Nodes';



const nodeTypes = { custom: CustomNode };

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { value: '' } },
    { id: '2', type: 'custom', position: { x: 250, y: 0 }, data: { value: '' } },
    { id: '3', type: 'custom', position: { x: 500, y: 0 }, data: { value: '' } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
