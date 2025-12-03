import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from "../Layouts/MainLayouts";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from '../Pages/Auth/Register';
import AllReviews from '../Pages/Reviews/AllReviews'
import ReviewDetails from '../Pages/Reviews/ReviewDetails'
import PrivateRoute from '../Routes/PrivateRoute';
import AddReview from '../Pages/Reviews/AddReview';
import MyReviews from '../Pages/Reviews/MyReviews';
import EditReview from '../Pages/Reviews/EditReview';
import MyFavorites from '../Pages/Reviews/MyFavorites';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts></MainLayouts>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/all-reviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "/review/:id",
                element: <ReviewDetails></ReviewDetails>
            },
            {
                path: "/add-review",
                element: (
                    <PrivateRoute>
                        <AddReview></AddReview>
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-reviews",
                element: (
                    <PrivateRoute>
                        <MyReviews></MyReviews>
                    </PrivateRoute>
                ),
            },
            {
                path: "/edit-review/:id",
                element: (
                    <PrivateRoute>
                        <EditReview></EditReview>
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-favorites",
                element: (
                    <PrivateRoute>
                        <MyFavorites></MyFavorites>
                    </PrivateRoute>
                )
            },
        ]
    }
]);

export default Router;