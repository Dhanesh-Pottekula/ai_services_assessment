import { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, X } from 'lucide-react';

interface OutputNodeData {
  outputText?: string;
}

interface OutputNodeProps {
  data: OutputNodeData;
  id: string;
}

export const OutputNode = ({ data, id }: OutputNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [outputText, setOutputText] = useState(data.outputText || '');
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[250px] shadow-sm hover:shadow-md transition-shadow relative">
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-orange-500 border-2 border-white shadow-lg hover:bg-orange-600"
        style={{ zIndex: 10 }}
      />
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">Output</h3>
          <p className="text-xs text-gray-500">Output of the result nodes as text</p>
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
            <Label htmlFor="output-text">Output Text</Label>
            <Textarea
              id="output-text"
              placeholder="Output will be generated based on query."
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          {outputText || "Output will be generated based on query."}
        </div>
      )}
    </div>
  );
}; 