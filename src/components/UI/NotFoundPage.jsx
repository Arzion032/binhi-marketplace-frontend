import { Link} from 'react-router-dom'

const NotFoundPage = () => {
return (
<header 
    className="flex items-center justify-center py-10 min-h-[400px]" 
    style={{ backgroundColor: "#014421" }}>

  <div className="container px-4 px-lg-5 text-center text-white">
    <h1 className="display-4 fw-bold">Page Not Found!</h1>
    <p className="lead fw-normal text-white-75 mb-4">
      The page you're looking for doesn't exist.
    </p>
    <Link to="/" className="btn btn-light btn-lg rounded-pill px-4 py-2">
      Go Back Home
    </Link>
  </div>
</header>
);
}

export default NotFoundPage