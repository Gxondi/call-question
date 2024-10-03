import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import Edit from '../pages/question/edit/Index';
import Stat from '../pages/question/stat/Index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />
                    },
                    {
                        path: 'star',
                        element: <Star />
                    },
                    {
                        path: 'trash',
                        element: <Trash />
                    }
                ]
            },
            
            {
                path: '*',
                element: <NotFound />
            }
        
        ]
    },

    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />
            },
            {
                path: 'stat/:id',
                element: <Stat />
            }
        ]
    },
])
export default router;

// 生成路由常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_LIST_PATHNAME = '/manage/list';
export const MANAGE_STAR_PATHNAME = '/manage/star';
export const MANAGE_TRASH_PATHNAME = '/manage/trash';
export const QUESTION_EDIT_PATHNAME = '/question/edit';
export const QUESTION_STAT_PATHNAME = '/question/stat';
export const NOT_FOUND_PATHNAME = '/404';
