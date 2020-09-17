import { RouterContext } from "./Context";
import { useContext } from "react";
import matchPath from "./matchPath";

export function useHistory() {
    return useContext(RouterContext).history;
}

export function useLocation() {
    return useContext(RouterContext).location;
}

export function useRouteMatch(path) {
    const location = useLocation();
    const match = useContext(RouterContext).match;
    return path ? matchPath(location.pathname, path) : match;
}

export function useParams() {
    const match = useContext(RouterContext).match;
    return match ? match.params : {};
}
