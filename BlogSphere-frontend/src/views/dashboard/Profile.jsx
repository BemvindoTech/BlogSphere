import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import {json, Link} from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import moment from "moment";
import Toast from "../../plugin/Toast.js";

function Profile() {
    const [profileData, setProfileData] = useState({
        image : null,
        full_name : " ",
        about : "",
        bio : "",
        country : "",
    });
    const user_id = useUserData()?.user_id;
    const [imagePreview, setImagePreview] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await apiInstance.get(`user/profile/${user_id}/`);
            setProfileData(response.data);
            console.log(response.data);
        }catch(error) {
            console.log(error);
        }

    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProfileData({
            ...profileData,
            [event.target.name]: selectedFile,
        });
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        if(selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async () => {
        const response = await apiInstance.get(`user/profile/${user_id}/`);
        const formData = new FormData();

        if (profileData.image && profileData.image !== response.data.image) {
            formData.append("image", profileData.image);
        }

        formData.append("full_name", profileData.full_name);
        formData.append("about", profileData.about);
        formData.append("bio", profileData.bio);
        formData.append("country", profileData.country);

        try {
            const response = await apiInstance.patch(`user/profile/${user_id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            Toast("success", "Votre profil a été modifié avec succés");
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    },[]);

    console.log(profileData?.full_name);

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="mb-0">Détails de votre profil</h3>
                                    <p className="mb-0">Vous avez la gestion des parametres de votre compte .</p>
                                </div>
                                <div className="card-body">
                                    <div className="d-lg-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center mb-4 mb-lg-0">
                                            <img src={imagePreview || profileData?.image} id="img-uploaded" className="avatar-xl rounded-circle" alt="avatar" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
                                            <div className="ms-3">
                                                <h4 className="mb-0">Photo de profil</h4>
                                                <p className="mb-0">Choisissez une image de moins de 800px.</p>
                                                <input type="file" className="form-control mt-3" name="image" onChange={handleFileChange} id="" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-5" />
                                    <div>
                                        <h4 className="mb-0 fw-bold">
                                            <i className="fas fa-user-gear me-2"></i> Informations personnelles
                                        </h4>
                                        <p className="mb-4 mt-2">Modifier vos informations personnelles et votre adresse.</p>
                                        <div className="row gx-3">
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="full_name">
                                                    Nom complet
                                                </label>
                                                <input onChange={handleProfileChange} name="full_name" type="text" id="full_name" className="form-control" value={profileData?.full_name || ""} placeholder="Votre nom complet?" required="" />
                                                <div className="invalid-feedback">Veillez renseigner votre nom.</div>
                                            </div>
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="bio">
                                                    Bio
                                                </label>
                                                <input onChange={handleProfileChange} name="bio" type="text" id="bio" className="form-control" value={profileData?.bio || ""} placeholder="Ecrivez un petit bio!" required="" />
                                                <div className="invalid-feedback">Veillez renseigner votre bio.</div>
                                            </div>
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="about">
                                                    A propos de moi
                                                </label>
                                                <textarea onChange={handleProfileChange} name="about" id="about" placeholder="Tell us about yourself..." value={profileData?.about || ""}  cols="30" rows="5" className="form-control"></textarea>
                                                <div className="invalid-feedback">Parlez nous un peu de vous .</div>
                                            </div>

                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="country">
                                                    Pays
                                                </label>
                                                <input onChange={handleProfileChange} name="country" type="text" id="country" className="form-control" value={profileData?.country || " "} placeholder="Vous etes de quel pays?" required="" />
                                                <div className="invalid-feedback">Veillez renseigner votre pays.</div>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <button onClick={handleFormSubmit} className="btn btn-primary" type="button">
                                                    Modifier mon profil <i className="fas fa-check-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Profile;
