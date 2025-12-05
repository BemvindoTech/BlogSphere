import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link} from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Moment from "../../plugin/Moment";

import moment from "moment";
import Toast from "../../plugin/Toast.js";

function Comments() {

    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState([]);
    const user_id = useUserData().user_id;

    const fetchComments = async () => {
        const comment_res = await apiInstance.get(`author/dashboard/comment-list/${user_id}/`);
        setComments(comment_res?.data);
    };
    useEffect(() => {
        fetchComments();
    },[]);

    const handleSubmitReply = async (commentId) => {
        try {
            const response = await  apiInstance.post(`author/dashboard/reply-comment/`, {
                comment_id: commentId,
                reply : reply,
            });
            console.log(response.data);
            fetchComments();
            Toast("success", "Réponse envoyé");
            setReply("")
        }catch(error) {
            console.log(error);
        }
    };

    console.log(comments);

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            {/* Card */}
                            <div className="card mb-4">
                                {/* Card header */}
                                <div className="card-header d-lg-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Comments</h3>
                                        <span>Vous avez ici l'apercu de tous les commentaires des vos articles.</span>
                                    </div>
                                </div>
                                {/* Card body */}
                                <div className="card-body">
                                    {/* List group */}
                                    <ul className="list-group list-group-flush">
                                        {/* List group item */}
                                        {comments?.map((comment, index) => (
                                            <>
                                                <li className="list-group-item p-4 shadow rounded-3 mb-4">
                                                    <div className="d-flex">
                                                        {/*<img*/}
                                                        {/*    src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-1.jpg"*/}
                                                        {/*    alt="avatar" className="rounded-circle avatar-lg" style={{*/}
                                                        {/*    width: "70px",*/}
                                                        {/*    height: "70px",*/}
                                                        {/*    borderRadius: "50%",*/}
                                                        {/*    objectFit: "cover"*/}
                                                        {/*}}/>*/}
                                                        <div className="ms-3 mt-2">
                                                            <div
                                                                className="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <h4 className="mb-0">{comment.name}</h4>
                                                                    <span> le { Moment(comment.date)}</span>
                                                                    <h6 className="mb-0 mt-1 text-decoration-underline" > Article : {comment.post.title}</h6>

                                                                </div>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p className="mt-2">
                                                                <span className="fw-bold me-2">
                                                                    Commentaire <i className="fas fa-arrow-right"></i>
                                                                </span>
                                                                    {comment?.comment}
                                                                </p>
                                                                <p className="mt-2">
                                                                <span className="fw-bold me-2">
                                                                    Réponse <i className="fas fa-arrow-right"></i>
                                                                </span>
                                                                    {comment?.reply || "Pas de réponse"}
                                                                </p>
                                                                <p>
                                                                    <button className="btn btn-outline-secondary"
                                                                            type="button" data-bs-toggle="collapse"
                                                                            data-bs-target={`#collapseExample${comment.id.toString()}`}
                                                                            aria-expanded="false"
                                                                            aria-controls={'collapseExample${comment.id.toString()}'}>
                                                                        Envoyer une réponse
                                                                    </button>
                                                                </p>
                                                                <div className="collapse" id={`collapseExample${comment.id.toString()}`}>
                                                                    <div className="card card-body">
                                                                        <div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="exampleInputEmail1"
                                                                                       className="form-label">
                                                                                    Ecrire la réponse
                                                                                </label>
                                                                                <textarea onChange={(e) => setReply(e.target.value)} value={reply} name="" id="" cols="30"
                                                                                          className="form-control"
                                                                                          rows="4"></textarea>
                                                                            </div>

                                                                            <button onClick={() => handleSubmitReply(comment.id)} type="button"
                                                                                    className="btn btn-primary">
                                                                                Envoyer la réponse <i
                                                                                className="fas fa-paper-plane"> </i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </>

                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Comments;
