// src/app/settings/_components/OptionManager.tsx
// This is a reusable component for managing drinks/milk/sugar
import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";

type Option = {
  id: number;
  name: string;
};

type OptionManagerProps = {
  title: string;
  options: Option[];
  onAdd: (name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, name: string) => Promise<void>;
};

export function OptionManager({
  title,
  options,
  onAdd,
  onDelete,
  onEdit,
}: OptionManagerProps) {
  const [newOption, setNewOption] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleAdd = async () => {
    if (!newOption.trim()) return;
    await onAdd(newOption);
    setNewOption("");
  };

  const startEdit = (option: Option) => {
    setEditingId(option.id);
    setEditingName(option.name);
  };

  const handleEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    await onEdit(editingId, editingName);
    setEditingId(null);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      
      {/* Add new option */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          onClick={handleAdd}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </button>
      </div>

      {/* List of options */}
      <div className="mt-6 space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2"
          >
            {editingId === option.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-sm"
              />
            ) : (
              <span className="text-sm text-gray-700">{option.name}</span>
            )}
            
            <div className="flex space-x-2">
              {editingId === option.id ? (
                <button
                  onClick={handleEdit}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Save className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(option)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(option.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}