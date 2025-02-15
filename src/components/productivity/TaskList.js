import { useState } from 'react';
import { PlusIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', dueDate: '' });

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ]);
    setNewTask({ title: '', priority: 'medium', dueDate: '' });
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Tasks</h2>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New task..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              task.status === 'completed' ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`h-5 w-5 rounded border ${
                  task.status === 'completed'
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                } flex items-center justify-center`}
              >
                {task.status === 'completed' && (
                  <CheckIcon className="h-4 w-4 text-white" />
                )}
              </button>
              <div>
                <p className={`text-sm ${
                  task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No tasks yet. Add some tasks to get started!
          </p>
        )}
      </div>
    </div>
  );
}
