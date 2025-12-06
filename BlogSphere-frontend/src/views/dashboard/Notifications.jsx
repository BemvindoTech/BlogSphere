import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import {json, Link} from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";

import moment from "moment";
import Moment from "../../plugin/Moment.js";
import Toast from "../../plugin/Toast.js";

function Notifications() {
    const [noti, setNoti] = useState([])
    const user_id = useUserData()?.user_id

    const fetchNoti = async () => {
        try {
            const noti_res = await apiInstance.get(`author/dashboard/noti-list/${user_id}/`);
            setNoti(noti_res?.data);
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNoti();
    },[]);

    const handleMarkNotiAsSeen = async (notiId) => {
        try {
            const response = await apiInstance.post(`author/dashboard/noti-mark-seen/`,{
                noti_id : notiId
            });
            fetchNoti();
            Toast('success', "Notifivation vue");
        }catch(error) {
            console.log(error);
        }
    };


    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="card mb-4">
                                <div className="card-header d-lg-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Notifications</h3>
                                        <span>Gerer ici tous vos notifications</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {noti.map((n) => (
                                            <>
                                                <li className="list-group-item p-4 shadow rounded-3 mt-4">
                                                    <div className="d-flex">
                                                        <div className="ms-3 mt-2">
                                                            <div
                                                                className="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <p className="mb-0 ">
                                                                        {n.type === "Like" && (
                                                                            <>
                                                                                <h4>
                                                                                    <i className="fas fa-thumbs-up text-primary "></i> Nouveau
                                                                                    j'aime
                                                                                </h4>

                                                                                <p className="mt-3">
                                                                                    {n.user.username} a aimé votre
                                                                                    article <b>{n.post.title}</b>
                                                                                </p>
                                                                            </>

                                                                        )}

                                                                        {n.type === "Comment" && (
                                                                            <>
                                                                                <h4>
                                                                                    <i className="bi bi-chat-left-quote-fill text-success "></i> Nouveau
                                                                                    commentaire
                                                                                </h4>

                                                                                <p className="mt-3">
                                                                                    {n.user.username} a commenté votre
                                                                                    article <b>{n.post.title}</b>
                                                                                </p>
                                                                            </>

                                                                        )}

                                                                        {n.type === "Bookmark" && (
                                                                            <>
                                                                                <h4>
                                                                                    <i className="fas fa-bookmark text-danger "></i> Nouveau
                                                                                    épingle
                                                                                </h4>

                                                                                <p className="mt-3">
                                                                                    {n.user.username} épinglé votre
                                                                                    article <b>{n.post.title}</b>
                                                                                </p>
                                                                            </>

                                                                        )}


                                                                    </p>

                                                                </div>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p className="mt-1">
                                                            <span className="me-2 fw-bold">
                                                                Date: <span className="fw-light">{Moment(n.date)}</span>
                                                            </span>
                                                                </p>
                                                                <p>
                                                                    <button onClick={() => handleMarkNotiAsSeen(n.id)} className="btn btn-outline-secondary"
                                                                            type="button">
                                                                        Marque comme vue <i className="fas fa-check"></i>
                                                                    </button>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </>
                                        ))}

                                        {noti.length < 1 && <p>Pas de notifiaction en ce moment</p>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Notifications;
