import * as auth from './auth'
import {TUser} from "../../types";
//import * as types from './constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {config} from "../../config";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user: TUser = {
    email: 'test@test.com',
    name: 'Иванов Иван Иванович',
    password: 'test'
}
const store = mockStore({ todos: [] });

describe('loginAction', () => {
    afterEach(() => {
        fetchMock.restore()
    });
/*    it('should check user login', () => {

        fetchMock.getOnce(config.loginUrl, {
            body: JSON.stringify({ email: user.email, name: user.password }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })


        // Эталонный экшен
        const expectedAction = {
            type: auth.LOGIN,
            user:user
        }

        return store.dispatch(auth.loginAction()).then(() => {
            // Возвращаем асинхронный экшен
            expect(store.getActions()).toEqual(expectedAction)
        })

    })*/
})