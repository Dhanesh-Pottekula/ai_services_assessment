import { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Eye, EyeOff, X } from 'lucide-react';

interface LLMNodeData {
  model?: string;
  apiKey?: string;
  prompt?: string;
  temperature?: string;
  webSearchEnabled?: boolean;
  serfApiKey?: string;
}

interface LLMNodeProps {
  data: LLMNodeData;
  id: string;
}

export const LLMNode = ({ data, id }: LLMNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [model, setModel] = useState(data.model || 'GPT 4o- Mini');
  const [apiKey, setApiKey] = useState(data.apiKey || '');
  const [prompt, setPrompt] = useState(data.prompt || 'You are a helpful PDF assistant. Use web search if the PDF lacks context CONTEXT: {context} User Query: {query}');
  const [temperature, setTemperature] = useState(data.temperature || '0.75');
  const [webSearchEnabled, setWebSearchEnabled] = useState(data.webSearchEnabled || true);
  const [serfApiKey, setSerfApiKey] = useState(data.serfApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSerfApiKey, setShowSerfApiKey] = useState(false);
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 min-w-[250px] shadow-lg relative">
      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="query-input"
        className="w-4 h-4 bg-purple-500 border-2 border-white shadow-lg hover:bg-purple-600"
        style={{ zIndex: 10 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="context-input"
        className="w-4 h-4 bg-purple-500 border-2 border-white shadow-lg hover:bg-purple-600"
        style={{ zIndex: 10 }}
      />
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">LLM (OpenAI)</h3>
          <p className="text-xs text-gray-500">Run a query with OpenAI LLM</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-6 w-6 p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <Label htmlFor="llm-model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GPT 4o- Mini">GPT 4o- Mini</SelectItem>
                <SelectItem value="GPT-4">GPT-4</SelectItem>
                <SelectItem value="GPT-3.5-turbo">GPT-3.5-turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="llm-api-key">API Key</Label>
            <div className="relative mt-1">
              <Input
                id="llm-api-key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="llm-prompt">Prompt</Label>
            <Textarea
              id="llm-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              min="0"
              max="2"
              step="0.01"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="web-search">WebSearch Tool</Label>
            <Switch
              id="web-search"
              checked={webSearchEnabled}
              onCheckedChange={setWebSearchEnabled}
            />
          </div>
          
          {webSearchEnabled && (
            <div>
              <Label htmlFor="serf-api-key">SERF API</Label>
              <div className="relative mt-1">
                <Input
                  id="serf-api-key"
                  type={showSerfApiKey ? 'text' : 'password'}
                  value={serfApiKey}
                  onChange={(e) => setSerfApiKey(e.target.value)}
                  placeholder="Enter SERF API key"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowSerfApiKey(!showSerfApiKey)}
                >
                  {showSerfApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          <div>Model: {model}</div>
          <div>API Key: {apiKey ? '••••••••' : 'Not set'}</div>
          <div>Web Search: {webSearchEnabled ? 'Enabled' : 'Disabled'}</div>
        </div>
      )}
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-purple-500 border-2 border-white shadow-lg hover:bg-purple-600"
        style={{ zIndex: 10 }}
      />
    </div>
  );
}; 