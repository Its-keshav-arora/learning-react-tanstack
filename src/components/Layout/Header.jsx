import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <header>
            <div>
                <NavLink to="/">React Query</NavLink>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/trad">Fetch Old</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq">Fetch RQ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/infinite">Infinite Scroll</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}