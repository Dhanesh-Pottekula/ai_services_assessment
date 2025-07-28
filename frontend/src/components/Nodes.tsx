// CustomNode.tsx
import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import type { NodeProps } from 'reactflow';

export default function CustomNode({ data, id }: NodeProps) {
  const { setNodes, getEdges } = useReactFlow();
  const [input, setInput] = useState(data.value || '');

  // Simulate processing
  const compute = (val: string) => val.toUpperCase(); // example

  useEffect(() => {
    const output = compute(input);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, value: input } };
        }

        // If this node is connected downstream, update its input
        const isConnected = getEdges().some(
          (e) => e.source === id && e.target === node.id
        );
        if (isConnected) {
          return { ...node, data: { ...node.data, value: output } };
        }

        return node;
      })
    );
  }, [input]);

  return (
    <div style={{ padding: 10, border: '1px solid #555', background: '#f5f5f5' }}>
      <Handle type="target" position={Position.Left} />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter value"
      />
      <div>Processed: {compute(input)}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
