// Footer.js
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  text-align: center;
  border-top: 1px solid #eaeaea;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    color: #0070f3;
  }
`;

const CopyRight = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="/">Home</FooterLink>
        <FooterLink href="/blogs">Blogs</FooterLink>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </FooterLinks>
      <CopyRight>
        &copy; {new Date().getFullYear()} Thynkray. All rights reserved.
      </CopyRight>
    </FooterContainer>
  );
};

export default Footer;
