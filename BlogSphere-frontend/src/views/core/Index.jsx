import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";
import Moment from "../../plugin/Moment";
import axios from "axios";

function Index() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [lastPosts, setLastPosts] = useState([]);


    const fetchPosts = async () => {
        try {
            const response_post = await apiInstance.get('post/lists/');
            setPosts(response_post.data);
        }catch (error){
            console.log(error);
        }
    };

    const fetchCategory = async () => {
        const response = await apiInstance.get(`post/category/list/`);
        setCategory(response.data);
    };

    const fetchPopularPost = () => {
        const sortedPopularPost = [...posts]?.sort((a, b) => b.view - a.view);
        setPopularPosts(sortedPopularPost);
    };

    const fetchLastPost = () => {
        const sortedLastPost = [...posts]?.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLastPosts(sortedLastPost);
    };

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, []);


    useEffect(() => {
        fetchPopularPost();
    }, [posts]);

    useEffect(() => {
        fetchLastPost();
    }, [posts]);

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = [...popularPosts]?.slice(indexOfFirstItem, indexOfLastItem);

    // const itemsPerPage = 4;
    const [currentPage1, setCurrentPage1] = useState(1);
    const indexOfLastItem1 = currentPage1 * itemsPerPage;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage;
    const postItems1 = [...lastPosts]?.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages = Math.ceil([...posts]?.length / itemsPerPage);
    const pageNumbers =  Array.from({ length:totalPages }, (_, index) => index + 1);



    return (
        <div>
            <Header />
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash">
                                <img src="assets/images/adv-3.png" alt="" />
                            </a>
                            <h2 className="text-start d-block mt-1">Articles tendances</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        {postItems?.map((post) => (
                            // console.log("Objet post :", post);
                            <div className="col-sm-6 col-lg-3" key={post?.id}>
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img"
                                             style={{width: "100%", height: "160px", objectFit: "cover"}}
                                             src={post.image} alt="Card image"/>
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to={`${post.slug}`}
                                                  className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {post.title?.slice(0, 15) + "..."}
                                            </Link>
                                        </h4>

                                        <ul className="mt-3 list-style-none" style={{listStyle: "none"}}>
                                            <li>
                                                <a href="#" className="text-dark text-decoration-none">
                                                    <i className="fas fa-user"></i> {post?.profile?.full_name || post?.user?.username}
                                                </a>
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-calendar"></i> {Moment(post?.date)}
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> {post?.view || 0 } Vue(s)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    <nav className="d-flex mt-2">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link text-dark fw-bold me-1 rounded" onClick={() => setCurrentPage(currentPage - 1)}>
                                    <i className="fas fa-arrow-left me-2" />
                                    Précedant
                                </button>
                            </li>
                        </ul>
                        <ul className="pagination">
                            {pageNumbers.map((number) => (
                                <li key={1} className={`page-item ${currentPage === number ? "active text-white" : ""}`}>
                                    <button className="page-link text-dark fw-bold rounded" onClick={() => setCurrentPage(number)}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === totalPages  ? "disabled" : ""}`}>
                                <button className="page-link text-dark fw-bold ms-1 rounded" onClick={() => setCurrentPage(currentPage + 1)}>
                                    Suivant
                                    <i className="fas fa-arrow-right ms-3 " />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <section className="bg-light pt-5 pb-5 mb-3 mt-3">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-12 ">
                            <div className="mb-4">
                                <h2>Categories</h2>
                            </div>
                            <div className="d-flex flex-wrap justify-content-between">
                                {category?.map((category,index) => (
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <div className="mt-2" key={index}>
                                            <Link to={`/category/${category.slug}/`} >
                                            <div className="card bg-transparent">
                                                <img className="card-img" src={category.image} style={{ width: "150px", height: "80px", objectFit: "cover" }} alt="card image" />
                                                <div className="d-flex flex-column align-items-center mt-3 pb-2">
                                                    <h5 className="mb-0">{category.title}</h5>
                                                    <small>{category.post_count || "0"} Article(s)</small>
                                                </div>
                                            </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash">
                                <img src="assets/images/adv-3.png" alt="" />
                            </a>
                            <h2 className="text-start d-block mt-1">Les derniers articles</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        {postItems1?.map((p, index) => (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={p.image} alt={p.title} />
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to={`${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {p.title?.slice(0, 15) + "..."}
                                            </Link>
                                        </h4>
                                        <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
                                            <li>
                                                <a href="#" className="text-dark text-decoration-none">
                                                    <i className="fas fa-user"></i> {p.profile?.full_name}
                                                </a>
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-calendar"></i> {Moment(p.date)}
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> {p.view} Vue(s)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav className="d-flex mt-2">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage1 === 1 ? "disabled" : ""}`}>
                                <button className="page-link text-dark fw-bold me-1 rounded" onClick={() => setCurrentPage1(currentPage1 - 1)}>
                                    <i className="fas fa-arrow-left me-2" />
                                    Précedant
                                </button>
                            </li>
                        </ul>
                        <ul className="pagination">
                            {pageNumbers.map((number) => (
                                <li key={1} className={`page-item ${currentPage1 === number ? "active text-white" : ""}`}>
                                    <button className="page-link text-dark fw-bold rounded" onClick={() => setCurrentPage1(number)}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage1 === totalPages  ? "disabled" : ""}`}>
                                <button className="page-link text-dark fw-bold ms-1 rounded" onClick={() => setCurrentPage1(currentPage1 + 1)}>
                                    Suivant
                                    <i className="fas fa-arrow-right ms-3 " />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Index;
