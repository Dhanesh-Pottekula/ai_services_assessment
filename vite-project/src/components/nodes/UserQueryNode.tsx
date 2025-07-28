import { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, X } from 'lucide-react';

interface UserQueryNodeData {
  query?: string;
}

interface UserQueryNodeProps {
  data: UserQueryNodeData;
  id: string;
}

export const UserQueryNode = ({ data, id }: UserQueryNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(data.query || '');
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 min-w-[250px] shadow-lg relative">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">User Query</h3>
          <p className="text-xs text-gray-500">Enter point for querys</p>
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
            <Label htmlFor="user-query">User Query</Label>
            <Textarea
              id="user-query"
              placeholder="Write your query here."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          {query || "Write your query here."}
        </div>
      )}
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-blue-500 border-2 border-white shadow-lg hover:bg-blue-600"
        style={{ zIndex: 10 }}
      />
    </div>
  );
}; 