import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import { useParams, Link } from 'react-router-dom';

function InnerPage() {
    const { userInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/inner-post/${id}`)
            .then(response => response.json())
            .then(data => setPostInfo(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-24">
            {postInfo ? (
                <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                        <img 
                            src={`http://localhost:3000/${postInfo.file}`} // Adjust this according to your file URL
                            alt={postInfo.title} 
                            className="w-full h-80 object-cover" // Full width with fixed height
                        />
                        {userInfo && (
                            <Link 
                                to={`/edit/${postInfo._id}`} 
                                className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Edit
                            </Link>
                        )}
                    </div>
                    <div className="p-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{postInfo.title}</h1>
                       
                        <div className="prose prose-gray">
                            {/* Render post content here */}
                            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                        </div>
                    </div>
                </article>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
}

export default InnerPage;
