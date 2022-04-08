import React, {useEffect, useState} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header';
import {BurgerIngredients} from '../burger-ingredients';
import {BurgerConstructor} from '../burger-constructor';
import {INGREDIENTS_CHOOSE, COUNTER_UP} from '../../services/actions';
import {getIngredients} from '../../services/actions/ingredients';
import { useDispatch} from '../../hooks/hooks'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import {LoginPage, RegisterPage, ForgotPasswordPage,ResetPasswordPage, ProfilePage, FeedPage, OrderPage} from '../../pages';
import {ProtectedRoute} from '../protected-route';
import {Modal} from "../modal";
import {IngredientDetails} from "../ingredient-details";
import {Order} from '../order/order';
import { TIngredient } from '../../types';

export const App = () => {
    const ModalSwitch = () => { // Сделано для возможности использования useLocation. Немного некрасиво, подскажите, пожалуйста, как сделать лучше?
        let location = useLocation();
        const history = useHistory();
        const dispatch = useDispatch();
        let [modalActive, setModalActive] = useState(false);
        const onClose = (e: Event) => {
            if(e) e.stopPropagation();
            history.goBack()
        }
        // Наличие клика по игредиенту
        let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
        useEffect(() => {
            dispatch(getIngredients());
        }, [dispatch]);
        const handleDrop = (item:TIngredient) => {
            dispatch({
                type: INGREDIENTS_CHOOSE,
                item: item
            })
            dispatch({
                type: COUNTER_UP,
                key: item._id,
                typeItem: item.type
            })
        };
        return (
            <div className={css.main_rect}>
                    <AppHeader/>
                    <Switch location={background || location}>
                        <Route path='/' exact={true}>
                            <main className={css.main_columns}>
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients/>
                                    <BurgerConstructor onDropHandler={handleDrop}/>
                                </DndProvider>
                            </main>
                        </Route>
                        <Route path='/login' exact={true}>
                            <LoginPage/>
                        </Route>
                        <Route path='/register' exact={true}>
                            <RegisterPage/>
                        </Route>
                        <Route path='/forgot-password' exact={true}>
                            <ForgotPasswordPage/>
                        </Route>
                        <Route path='/reset-password' exact={true}>
                            <ResetPasswordPage/>
                        </Route>

                        <Route path='/feed' exact >
                            <FeedPage />
                        </Route>
                        <Route path='/feed/:id' exact={true} >
                            <OrderPage />
                        </Route>
{/*
                        <ProtectedRoute path='/profile/orders/:id' exact >
                            <OrderPage />
                        </ProtectedRoute>*/}

                        <ProtectedRoute path={`/profile`}>
                            <ProfilePage/>
                        </ProtectedRoute>

                        <Route path='/ingredients/:id' exact={true}>
                                <IngredientDetails/>
                        </Route>
                        <Route>
                            <h1>Ошибка 404: страница не найдена</h1>
                        </Route>
                    </Switch>
                {background && modalActive &&
                (<>
                    <Route
                        path='/ingredients/:id'
                        children={
                            <Modal header="Детали ингредиента" onClose={onClose}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                 </>
                )}
                {background && (
                <>
                    <Route
                        path='/feed/:id'
                        children={
                            <Modal onClose={onClose}>
                               <Order/>
                            </Modal>
                        }
                    />
                </>
                )}
                {background && (
                    <>
                        <Route
                            path='/profile/orders/:id'
                            children={
                                <Modal onClose={onClose}>
                                    <Order/>
                                </Modal>
                            }
                        />
                    </>
                )}

            </div>
        );
    };
    return (
        <BrowserRouter>
            <ModalSwitch />
        </BrowserRouter>
    )

}

export default App;