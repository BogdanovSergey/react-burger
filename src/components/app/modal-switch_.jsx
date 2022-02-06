import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {COUNTER_UP, INGREDIENTS_CHOOSE} from "../../services/actions";
import css from "./app.module.css";
import {AppHeader} from "../app-header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../burger-ingredients";
import {BurgerConstructor} from "../burger-constructor";
import {ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage} from "../../pages";
import {ProtectedRoute} from "../protected-route";
import {IngredientDetails} from "../ingredient-details";
import {Modal} from "../modal";
import {BrowserRouter, Route, Switch, useLocation, useHistory } from 'react-router-dom';
//import App from "./app";

export const ModalSwitch_ = () => { // Сделано для возможности использования useLocation. Немного некрасиво, подскажите, пожалуйста, как сделать лучше?
    let location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    let [modalActive, setModalActive] = useState(false);
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
            {background && modalActive &&
            (<>
                    {/*заход по клику*/}
                    <Route path='/ingredients/:id' children={<Modal header="Детали ингредиента!" setModalActive={setModalActive}><IngredientDetails /></Modal>} />
                </>
            )}
        </div>
    );
};

export default ModalSwitch_;