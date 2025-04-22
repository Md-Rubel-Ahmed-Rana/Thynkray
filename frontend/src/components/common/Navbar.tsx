// Navbar.js
import { useGetLoggedInUser } from "@/modules/user/hooks";
import Link from "next/link";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`;

const UserName = styled.h1`
  font-size: "30px";
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.li`
  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #0070f3;
    }
  }
`;

const Navbar = () => {
  const { user, isLoading } = useGetLoggedInUser();
  console.log({
    from: "Navbar",
    user,
    isLoading,
  });
  return (
    <NavbarContainer>
      <Logo href="/">Thynkray</Logo>
      <UserName>{user?.name}</UserName>
      <NavLinks>
        <NavLink>
          <Link href="/">Home</Link>
        </NavLink>
        <NavLink>
          <a href="/blogs">Blogs</a>
        </NavLink>
        <NavLink>
          <a href="/about">About</a>
        </NavLink>
        <NavLink>
          <a href="/contact">Contact</a>
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
