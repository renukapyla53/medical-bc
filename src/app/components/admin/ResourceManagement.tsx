import React, { useEffect, useState } from 'react';

interface Resource {
  id: number;
  title: string;
  category: string;
  content: string;
}

export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchResources = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/resources');
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resourceData = { title, category, content };

    try {
      if (editingId) {
        await fetch(`http://localhost:5000/api/resources/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resourceData),
        });
      } else {
        await fetch('http://localhost:5000/api/resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resourceData),
        });
      }

      setTitle('');
      setCategory('');
      setContent('');
      setEditingId(null);
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
    }
  };

  const handleEdit = (resource: Resource) => {
    setTitle(resource.title);
    setCategory(resource.category);
    setContent(resource.content);
    setEditingId(resource.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'DELETE',
      });
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resource Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingId ? 'Update Resource' : 'Add Resource'}
        </button>
      </form>

      <table border={1} cellPadding={10} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.title}</td>
              <td>{resource.category}</td>
              <td>{resource.content}</td>
              <td>
                <button onClick={() => handleEdit(resource)}>Edit</button>
                <button onClick={() => handleDelete(resource.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


