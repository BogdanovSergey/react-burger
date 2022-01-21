import React, {useEffect, useState} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header';
import {BurgerIngredients} from '../burger-ingredients';
import {BurgerConstructor} from '../burger-constructor';
import {INGREDIENTS_CHOOSE, COUNTER_UP} from '../../services/actions';
import {getIngredients} from '../../services/actions/ingredients';
import {useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import {LoginPage, RegisterPage, ForgotPasswordPage,ResetPasswordPage, ProfilePage} from '../../pages';
import {ProtectedRoute} from '../protected-route';
import {Modal} from "../modal";
import {IngredientDetails} from "../ingredient-details";

export const App = () => {
    const ModalSwitch = () => { // Сделано для возможности использования useLocation. Немного некрасиво, подскажите, пожалуйста, как сделать лучше?
        let location = useLocation();
        const history = useHistory();
        const dispatch = useDispatch();
        // Наличие клика по игредиенту
        let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

        useEffect(() => {
            dispatch(getIngredients());
        }, [dispatch]);
        const handleDrop = (item) => {
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
                            {/*<MainPage />*/}

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
                        {/*<Route path='/profile'>
                        <ProfilePage />
                    </Route>*/}
                        <ProtectedRoute path='/profile'>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <Route path='/ingredients/:id' exact={true}>
                                <IngredientDetails/>
                        </Route>

                        <Route>
                            <h1>Ошибка 404: страница не найдена</h1>
                        </Route>


                    </Switch>

                {background &&
                (<>
                        {/*заход по клику*/}
                        <Route path='/ingredients/:id' children={<Modal header="Детали ингредиента"><IngredientDetails /></Modal>} />
                 </>
                )}

            </div>
        );
    };
    return (
        <Router>
            <ModalSwitch />
        </Router>
    )

}

export default App;