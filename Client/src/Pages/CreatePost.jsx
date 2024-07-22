import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Editor from '../components/Editor';

function CreatePost() {
  const [data, setData] = useState({
    title: '',
    summary: '',
    content: ''
  });
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    if (!data.title || !data.summary) {
      setError('Title and summary are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('content', data.content);
    if (file) {
      formData.append('file', file); // Append file if selected
    }

    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result);
      setRedirect(true); // Redirect after successful submission

    } catch (err) {
      setError('Failed to submit post');
      console.error('Error:', err);
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setData(prev => ({
      ...prev, [id]: value
    }));
  }

  function handleEditorChange(value) {
    setData(prev => ({
      ...prev, content: value
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <input
            id="title"
            type="text"
            className="form-control border p-2 rounded"
            placeholder="Title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            id="summary"
            type="text"
            className="form-control border p-2 rounded"
            placeholder="Summary"
            value={data.summary}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <Editor value={data.content} onChange={handleEditorChange} />
        </div>
        <button type="submit" className="btn btn-primary bg-blue-500 text-white p-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
