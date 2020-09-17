import React from "react";
// import MyRCFieldForm from "./pages/MyRCFieldForm";
// import ReduxPage from "./pages/ReduxPage";

// function App() {
//     return (
//         <div className="App">
//             {/* <MyRCFieldForm /> */}
//             {/* <ReduxPage /> */}
//         </div>
//     );
// }

// export default App;
// import { withRouter } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    // useRouteMatch,
    // useHistory,
    // useLocation,
    // useParams,
    withRouter,
    Prompt
} from "./InchReactRouter/";

import HomePage from "./pagesRoute/HomePage";
import UserPage from "./pagesRoute/UserPage";
import LoginPage from "./pagesRoute/LoginPage";
import _404Page from "./pagesRoute/_404Page";
// import RouteComponentPage from "./pagesRoute/RouteComponentPage";
import WelcomePage from "./pagesRoute/WelcomePage";

export default function App(props) {
    return (
        <div className="app">
            <Router>
                <Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                <Link to="/login">登录</Link>
                <Link to="/product/123">商品</Link>

                <Switch>
                    <Route
                        exact
                        path="/"
                        // children={children}
                        component={HomePage}
                    // render={render}
                    />
                    <Route path="/user" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    {/* <Route path="/product/:id" component={Product} /> */}
                    {/* 如下，如果不是直接组件，而是匿名内联组件，需要使用withRouter处理才能拿到props */}
                    <Route path="/product/:id" render={() => <Product />} />

                    <Route path="/welcome" component={WelcomePage} />

                    {/* 这里没有path值，用的是Router默认的match，默认是匹配的 */}
                    <Route component={_404Page} />
                </Switch>
            </Router>
        </div>
    );
}

// function children(props) {
//     console.log("children props", props);
//     return <div>children</div>;
// }

// function render(props) {
//     console.log("render props", props);
//     return <div>render</div>;
// }

@withRouter
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confirm: true };
    }
    render() {
        const { params, url } = this.props.match;
        const { id } = params;

        return (
            <div>
                <h1>Product-{id}</h1>
                <Link to={url + "/detail"}>详情</Link>
                <Route path={url + "/detail"} component={Detail} />
                <Link to="/">go home</Link>
                <button onClick={() => { this.setState({ confirm: !this.state.confirm }) }}>
                    change
                </button>
                <Prompt when={this.state.confirm} message="你确定要离开吗？" />
            </div>
        );
    }
}
// function Product({ match }) {
//     // const match = useRouteMatch();
//     // const history = useHistory();
//     // const location = useLocation();
//     // const params = useParams();
//     const { params, url } = match;
//     const { id } = params;
//     return (
//         <div>
//             <h1>Product-{id}</h1>
//             <Link to={url + "/detail"}>详情</Link>
//             <Route path={url + "/detail"} component={Detail} />
//         </div>
//     );
// }
function Detail({ match }) {
    return (
        <div>
            <h1>detail</h1>
        </div>
    );
}
