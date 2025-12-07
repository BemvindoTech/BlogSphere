import {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import {Link, useNavigate, useParams} from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Swal from "sweetalert2";

function AddPost() {
    const [post, setEditPost] = useState({image: "", title: " zzzz",description: "", category: parseInt(""), tags: "", status: ""});
    const [imagePreview, setImagePreview] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const userId = useUserData()?.user_id;
    const navigate = useNavigate();
    const param = useParams();

    const fetchPosts = async () => {
        const response = await apiInstance.get(`author/dashboard/post-detail/${userId}/${param.id}/`);
        console.log(response.data);
        setEditPost(response.data);
    };

    const fetchCategory = async () => {
        try {
            const response = await apiInstance.get('post/category/list/');
            setCategoryList(response.data);
        }catch(error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCategory();
        fetchPosts();
    },[]);

    const handleCreatePostChange = (event) => {
        setCreatePost({
            ...post,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image : {
                file : event.target.files[0],
                preview: reader.result,
            },
        });

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile){
            reader.readAsDataURL(selectedFile);
        }

    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!post.title || !post.description || !post.image) {
            Toast("error", "Tous les champs sont requis");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();

        formData.append("user_id", userId);
        formData.append("title", post.title);
        formData.append("image", post.image.file);
        formData.append("description", post.description);
        formData.append("tags", post.tags);
        formData.append("category", post.category);
        formData.append("post_status", post.status);

        try {
            const response = await apiInstance.post(`author/dashboard/post-create/`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setIsLoading(false);
            Swal.fire({
                icon: "success",
                title: "Article crée avec succés",
            });
            navigate("/posts/");
        } catch(error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            <>
                                <section className="py-4 py-lg-6 bg-primary rounded-3">
                                    <div className="container">
                                        <div className="row">
                                            <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                                                <div className="d-lg-flex align-items-center justify-content-between">
                                                    <div className="mb-4 mb-lg-0">
                                                        <h1 className="text-white mb-1">Edit Blog Post</h1>
                                                        <p className="mb-0 text-white lead">Use the article builder below to edit your article.</p>
                                                    </div>
                                                    <div>
                                                        <Link to="/instructor/posts/" className="btn" style={{ backgroundColor: "white" }}>
                                                            {" "}
                                                            <i className="fas fa-arrow-left"></i> Back to Posts
                                                        </Link>
                                                        <a href="instructor-posts.html" className="btn btn-dark ms-2">
                                                            Save Changes <i className="fas fa-check-circle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="pb-8 mt-5">
                                    <div className="card mb-3">
                                        {/* Basic Info Section */}
                                        <div className="card-header border-bottom px-4 py-3">
                                            <h4 className="mb-0">Basic Information</h4>
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="postTHumbnail" className="form-label">
                                                Preview
                                            </label>
                                            <img style={{ width: "100%", height: "330px", objectFit: "cover", borderRadius: "10px" }} className="mb-4" src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" alt="" />
                                            <div className="mb-3">
                                                <label htmlFor="postTHumbnail" className="form-label">
                                                    Thumbnail
                                                </label>
                                                <input id="postTHumbnail" className="form-control" type="file" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input className="form-control" type="text" placeholder="" />
                                                <small>Write a 60 character post title.</small>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Posts category</label>
                                                <select className="form-select">
                                                    <option value="">-------------</option>
                                                    <option value="React">Lifstyle</option>
                                                    <option value="Javascript">Fashion</option>
                                                    <option value="HTML">Tech</option>
                                                    <option value="Vue">Health</option>
                                                    <option value="Gulp">Entertainment</option>
                                                </select>
                                                <small>Help people find your posts by choosing categories that represent your post.</small>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Post Description</label>
                                                <textarea name="" className="form-control" id="" cols="30" rows="10"></textarea>
                                                <small>A brief summary of your posts.</small>
                                            </div>
                                            <label className="form-label">Tag</label>
                                            <input className="form-control" type="number" placeholder="health, medicine, fitness" />
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-success w-100 mt-2" type="button">
                                        Update Post <i className="fas fa-check-circle"></i>
                                    </button>
                                </section>
                            </>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default AddPost;
