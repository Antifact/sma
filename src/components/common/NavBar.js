import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

const NavBar = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        navigate('/login', { replace: true });
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">big shitters</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
                Separated link
            </NavDropdown.Item>
            </NavDropdown>
        </Nav>

        <Nav activeKey="/" onSelect={selectedKey => {
            // eslint-disable-next-line default-case
            switch (selectedKey) {
                case 'logout':
                    break;
                case 'login':
                    break;
                }
            }}>
            </Nav>

            <Nav>

                <Nav.Item className="navItem">
                    <Button variant="outline-info" className="logoutBtn" onClick={logout}>{user ? 'Logout' : 'Login'}</Button>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default NavBar;