import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import EquatePage from "./EquatePage";

const Pages: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <EquatePage></EquatePage>
                </Route>
            </Switch>
        </Router>
    );
}
export default Pages;