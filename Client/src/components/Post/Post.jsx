import { Data } from './Dummy';

const Post = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {Data.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.heading} 
                style={{ height: '300px', objectFit: 'cover' }} // Fixed image size with responsive behavior
              />
              <div className="card-body">
                <h5 className="card-title">{item.heading}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.title}</h6>
                <p className="card-text">{item.date}</p>
                <p className="card-text"><small className="text-muted">By {item.authorName}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
