import { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Eye, EyeOff, X } from 'lucide-react';

interface KnowledgeBaseNodeData {
  embeddingModel?: string;
  apiKey?: string;
}

interface KnowledgeBaseNodeProps {
  data: KnowledgeBaseNodeData;
  id: string;
}

export const KnowledgeBaseNode = ({ data, id }: KnowledgeBaseNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [embeddingModel, setEmbeddingModel] = useState(data.embeddingModel || 'text-embedding-3-large');
  const [apiKey, setApiKey] = useState(data.apiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="bg-white border-2 border-green-200 rounded-lg p-4 min-w-[250px] shadow-lg relative">
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-green-500 border-2 border-white shadow-lg hover:bg-green-600"
        style={{ zIndex: 10 }}
      />
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">Knowledge Base</h3>
          <p className="text-xs text-gray-500">Let LLM search info in your file</p>
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
            <Label>File for Knowledge Base</Label>
            <Button variant="outline" className="w-full mt-1">
              Upload File
            </Button>
          </div>
          
          <div>
            <Label htmlFor="embedding-model">Embedding Model</Label>
            <Select value={embeddingModel} onValueChange={setEmbeddingModel}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="kb-api-key">API Key</Label>
            <div className="relative mt-1">
              <Input
                id="kb-api-key"
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
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          <div>Model: {embeddingModel}</div>
          <div>API Key: {apiKey ? '••••••••' : 'Not set'}</div>
        </div>
      )}
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-green-500 border-2 border-white shadow-lg hover:bg-green-600"
        style={{ zIndex: 10 }}
      />
    </div>
  );
}; 