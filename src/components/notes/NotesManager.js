import { useState } from 'react';
import { PlusIcon, FolderIcon, TagIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import NoteEditor from './NoteEditor';

export default function NotesManager() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome to Beacon Notes',
      content: '<h1>Welcome to Beacon Notes!</h1><p>This is your first note. You can:</p><ul><li>Create new notes</li><li>Organize them with folders</li><li>Add tags for easy searching</li><li>Use rich text formatting</li></ul>',
      folder: 'Getting Started',
      tags: ['welcome', 'tutorial'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [folders] = useState(['Getting Started', 'Personal', 'Work', 'Ideas']);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    folder: '',
    tags: '',
  });

  const handleCreateNote = (e) => {
    e.preventDefault();
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      folder: newNote.folder,
      tags: newNote.tags.split(',').map(tag => tag.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, note]);
    setSelectedNote(note);
    setShowNewNoteForm(false);
    setNewNote({ title: '', content: '', folder: '', tags: '' });
  };

  const handleUpdateNote = (content) => {
    if (!selectedNote) return;
    
    const updatedNote = {
      ...selectedNote,
      content,
      updatedAt: new Date().toISOString(),
    };
    
    setNotes(notes.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(notes[0]);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = selectedFolder === 'All' || note.folder === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex h-[calc(100vh-12rem)] gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg shadow-sm p-4 flex flex-col">
          <div className="mb-4">
            <button
              onClick={() => setShowNewNoteForm(true)}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Note
            </button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center">
              <FolderIcon className="h-4 w-4 mr-2" />
              Folders
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedFolder('All')}
                  className={`w-full text-left px-2 py-1 rounded ${
                    selectedFolder === 'All' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Notes
                </button>
              </li>
              {folders.map(folder => (
                <li key={folder}>
                  <button
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedFolder === folder ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {folder}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center">
              <TagIcon className="h-4 w-4 mr-2" />
              Recent Notes
            </h3>
            <ul className="space-y-1">
              {filteredNotes.map(note => (
                <li key={note.id}>
                  <button
                    onClick={() => setSelectedNote(note)}
                    className={`w-full text-left p-2 rounded flex items-center justify-between ${
                      selectedNote?.id === note.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 truncate">
                      <div className="font-medium">{note.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {showNewNoteForm ? (
            <form onSubmit={handleCreateNote} className="space-y-4">
              <input
                type="text"
                placeholder="Note title"
                className="w-full px-4 py-2 border rounded-md"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="px-4 py-2 border rounded-md"
                  value={newNote.folder}
                  onChange={(e) => setNewNote({ ...newNote, folder: e.target.value })}
                  required
                >
                  <option value="">Select Folder</option>
                  {folders.map(folder => (
                    <option key={folder} value={folder}>{folder}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  className="px-4 py-2 border rounded-md"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                />
              </div>
              <NoteEditor
                content={newNote.content}
                onChange={(content) => setNewNote({ ...newNote, content })}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewNoteForm(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Note
                </button>
              </div>
            </form>
          ) : selectedNote ? (
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedNote.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{selectedNote.folder}</span>
                  <span>•</span>
                  <span>Updated {new Date(selectedNote.updatedAt).toLocaleDateString()}</span>
                </div>
                {selectedNote.tags.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2">
                    {selectedNote.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <NoteEditor
                  content={selectedNote.content}
                  onChange={handleUpdateNote}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a note or create a new one to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
