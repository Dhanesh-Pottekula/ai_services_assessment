import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, useReactFlow } from '@xyflow/react';
import type { Node, Edge, Connection, NodeTypes, NodeChange, EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import {  MessageCircle, Fullscreen, Plus, Minus, Settings } from 'lucide-react';
import { UserQueryNode, KnowledgeBaseNode, LLMNode, OutputNode } from '@/components/nodes';
import { ChatDialog } from '@/components/ChatDialog';



const nodeTypes: NodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  output: OutputNode,
};

const initialNodes: Node[] = [
  {
    id: 'user-query',
    type: 'userQuery',
    position: { x: 100, y: 100 },
    data: { label: 'User Query', query: '' }
  },
  {
    id: 'knowledge-base',
    type: 'knowledgeBase',
    position: { x: 400, y: 100 },
    data: { label: 'Knowledge Base', embeddingModel: 'text-embedding-3-large', apiKey: '' }
  },
  {
    id: 'llm',
    type: 'llm',
    position: { x: 700, y: 100 },
    data: { 
      label: 'LLM (OpenAI)', 
      model: 'GPT 4o- Mini',
      apiKey: '',
      prompt: 'You are a helpful PDF assistant. Use web search if the PDF lacks context CONTEXT: {context} User Query: {query}',
      temperature: '0.75',
      webSearchEnabled: true,
      serfApiKey: ''
    }
  },
  {
    id: 'output',
    type: 'output',
    position: { x: 1000, y: 100 },
    data: { label: 'Output', outputText: '' }
  }
];

const initialEdges: Edge[] = [
  { 
    id: 'user-query-to-kb', 
    source: 'user-query', 
    target: 'knowledge-base', 
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 3 },
    animated: true
  },
  { 
    id: 'user-query-to-llm', 
    source: 'user-query', 
    target: 'llm', 
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 3 },
    animated: true
  },
  { 
    id: 'kb-to-llm', 
    source: 'knowledge-base', 
    target: 'llm', 
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 3 },
    animated: true
  },
  { 
    id: 'llm-to-output', 
    source: 'llm', 
    target: 'output', 
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 3 },
    animated: true
  }
];

export function FlowEditorPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: type as keyof NodeTypes,
        position,
        data: { label: type, ...getNodeData(type) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  const getNodeData = (nodeType: string) => {
    switch (nodeType) {
      case 'userQuery':
        return { query: '' };
      case 'knowledgeBase':
        return { embeddingModel: 'text-embedding-3-large', apiKey: '' };
      case 'llm':
        return { 
          model: 'GPT 4o- Mini',
          apiKey: '',
          prompt: 'You are a helpful PDF assistant. Use web search if the PDF lacks context CONTEXT: {context} User Query: {query}',
          temperature: '0.75',
          webSearchEnabled: true,
          serfApiKey: ''
        };
      case 'output':
        return { outputText: '' };
      default:
        return {};
    }
  };

// Zoom Controls Component
function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-4 right-1/2 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
      <div className="flex flex-row space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => zoomIn()}
          title="Zoom In"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => zoomOut()}
          title="Zoom Out"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => fitView()}
          title="Fit View"
        >
          <Fullscreen className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

  const componentTypes = [
    { name: 'User Query', type: 'userQuery' },
    { name: 'LLM (OpenAI)', type: 'llm' },
    { name: 'Knowledge Base', type: 'knowledgeBase' },
    { name: 'Output', type: 'output' }
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white overflow-y-auto px-4">
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Components</h3>
            <div className="space-y-2">
              {componentTypes.map((component) => (
                <div
                  key={component.type}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-move hover:bg-gray-50"
                  draggable
                  onDragStart={(event) => onDragStart(event, component.type)}
                >
                  <span className="text-sm font-medium text-gray-700">{component.name}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 w-full relative bg-gray-50" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-400"
            style={{ height: '100%' }}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { stroke: '#2563eb', strokeWidth: 3 },
              animated: true,
            }}
            connectionLineStyle={{ stroke: '#2563eb', strokeWidth: 3 }}
          >
            <ZoomControls />
          </ReactFlow>
        </div>
      </div>


      {/* Chat with AI Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat with AI
        </Button>
      </div>

      {/* Chat Dialog */}
      <ChatDialog 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
} 