import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import {json, Link} from "react-router-dom";
import useAuth from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import axios from "axios";
import index from "../core/Index.jsx";
import moment from "moment";

function Posts() {
    const [posts, setPosts] = useState([]);

    const user_id = useUserData()?.user_id

    const fetchPost = async () => {
        try {
            const post_res = await apiInstance.get(`author/dashboard/post-list/${user_id}/`);
            setPosts(post_res?.data);
            console.log(post_res?.data);
        }catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            fetchPost();
        }else{
            const filtered = posts.filter((post) => {
                return post.title.toLowerCase().includes(query);
            });
            setPosts(filtered);
        }
    };

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        const sortedPosts = [...posts];

        if (sortValue === "Newest") {
            sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        }else if (sortValue === "Oldest") {
            sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        setPosts(sortedPosts);
    };

    useEffect(() => {
        fetchPost();
    },[]);

    return (
        <>
            <Header />
            <section className="py-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border bg-transparent rounded-3">
                                <div className="card-header bg-transparent border-bottom p-3">
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h5 className="mb-2 mb-sm-0">
                                            Tous vos articles de blog <span className="badge bg-primary bg-opacity-10 text-primary">{posts?.length}</span>
                                        </h5>
                                        <a href="#" className="btn btn-sm btn-primary mb-0">
                                            Ajouter un article <i className="fas fa-plus"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3 align-items-center justify-content-between mb-3">
                                        <div className="col-md-8">
                                            <form className="rounded position-relative">
                                                <input onChange={(e)=> handleSearch(e)} className="form-control pe-5 bg-transparent" type="search" placeholder="Rechercher un article" aria-label="Search" />
                                                <button className="btn bg-transparent border-0 px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit">
                                                    <i className="fas fa-search fs-6 " />
                                                </button>
                                            </form>
                                        </div>
                                        <div className="col-md-3">
                                            <form>
                                                <select onChange={handleSortChange} className="form-select z-index-9 bg-transparent" aria-label=".form-select-sm">
                                                    <option value="">Trier par</option>
                                                    <option value={"Newest"}>Nouveau</option>
                                                    <option value={"Oldest"}>Ancien</option>
                                                    {/*<option>------</option>*/}
                                                    {/*<option>publié</option>*/}
                                                    {/*<option>Brouillon</option>*/}
                                                    {/*<option>Disabled</option>*/}
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                    {/* Search and select END */}
                                    {/* Blog list table START */}
                                    <div className="table-responsive border-0">
                                        <table className="table align-middle p-4 mb-0 table-hover table-shrink">
                                            {/* Table head */}
                                            <thead className="table-dark">
                                            <tr>
                                                <th scope="col" className="border-0 rounded-start">
                                                    Nom de l'article
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Vues
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Date de publication
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Catégorie
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Status
                                                </th>
                                                <th scope="col" className="border-0 rounded-end">
                                                    Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="border-top-0">
                                            {posts?.map((post, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <h6 className="mt-2 mt-md-0 mb-0 ">
                                                            <a href="#" className="text-dark text-decoration-none">
                                                                {post.title}
                                                            </a>
                                                        </h6>
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-0">
                                                            <a href="#" className="text-dark text-decoration-none">
                                                                {post.view} Views
                                                            </a>
                                                        </h6>
                                                    </td>
                                                    <td>{moment(post.date).format("DD MM YYYY")}.</td>
                                                    <td>{post.category.title}</td>
                                                    <td>
                                                        <span className="badge bg-dark  text-white mb-2">{post.status}</span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <a href="#" className="btn-round mb-0 btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                                <i className="bi bi-trash" />
                                                            </a>
                                                            <a href="dashboard-post-edit.html" className="btn btn-primary btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                                <i className="bi bi-pencil-square" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<Footer />*/}
        </>
    );
}

export default Posts;
