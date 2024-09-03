import { useState } from 'react';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://insight-nest-five.vercel.app/api/append-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, tags: tags.split(','), description, reference }),
    });

    if (response.ok) {
      setStatus('Data saved successfully!');
      setTitle('');
      setTags('');
      setDescription('');
      setReference('');
    } else {
      setStatus('Failed to save data.');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reference Link</label>
          <input
            type="url"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
