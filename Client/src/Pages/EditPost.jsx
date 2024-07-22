import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

function EditPost() {
    const [data, setData] = useState({
        title: '',
        summary: '',
        content: ''
    });
    const [file, setFile] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:3000/inner-post/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const result = await response.json();
                setData({
                    title: result.title,
                    summary: result.summary,
                    content: result.content
                    
                });
                setFile(result.file)

            } catch (err) {
                console.error('Error fetching post:', err);
            }
        }

        fetchPost();
    }, [id]);

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

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('summary', data.summary);
        formData.append('content', data.content);
        if (file) {
            formData.append('file', file); // Append file if selected
        }

        try {
            const response = await fetch(`http://localhost:3000/post/${id}`, {
                method: 'PUT', // Use PUT for updates
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            setRedirect(true); // Redirect after successful update
        } catch (err) {
            console.error('Error:', err);
        }
    }

    if (redirect) {
        return <Navigate to={`/inner-post/${id}`} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                        id="summary"
                        type="text"
                        className="form-control"
                        placeholder="Summary"
                        value={data.summary}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-4">
                    <Editor value={data.content} onChange={handleEditorChange} />
                </div>
                <button type="submit" className="btn btn-primary w-full">Update</button>
            </form>
        </div>
    );
}

export default EditPost;
