import { call, put, takeEvery } from 'redux-sage/effects';
import LoginService from '../service/login';

// worker saga，执行更新
function* loginHandle(action) {
    try {
        // 同步的方式执行异步请求
        // call 是阻塞式的，多个请求间有先后关系
        // fork 是非阻塞式的，多个请求之间无先后关系，并行请求
        const res1 = yield call(LoginService.login, action.payload);
        const res2 = yield call(LoginService.getMoreUserInfo, res1);

        // 更新state
        yield put({ type: "LOGIN_SUCCESS", payload: res2 })
    } catch (err) {
        yield put({ type: "LOGIN_FAILURE", payload: err })
    }
}

// watcher saga，订阅
function* loginSaga() {
    yield takeEvery("LOGIN_SAGA", loginHandle);
}

export default loginSaga;



