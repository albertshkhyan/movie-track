import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Reset basic styles */
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Body styles */
    body {
        font-family: ${({ theme }) => theme.typography.fontFamily};
        background-color: ${({ theme }) => theme.palette.background.default};
        color: ${({ theme }) => theme.palette.text.primary};
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
        font-family: ${({ theme }) => theme.typography.fontFamily};
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    h1 {
        font-size: ${({ theme }) => theme.typography.h1.fontSize};
        font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
        line-height: ${({ theme }) => theme.typography.h1.lineHeight};
    }

    h2 {
        font-size: ${({ theme }) => theme.typography.h2.fontSize};
        font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
        line-height: ${({ theme }) => theme.typography.h2.lineHeight};
    }

    h3 {
        font-size: ${({ theme }) => theme.typography.h3.fontSize};
        font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
        line-height: ${({ theme }) => theme.typography.h3.lineHeight};
    }

    /* Other Headings */
    h4, h5, h6 {
        font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    }

    /* Paragraphs */
    p {
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.palette.text.secondary};
    }

    /* Links */
    a {
        color: ${({ theme }) => theme.palette.primary.main};
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
            color: ${({ theme }) => theme.palette.primary.dark};
        }
    }

    /* Buttons */
    button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        padding: ${({ theme }) => theme.spacing(2)};
        border-radius: ${({ theme }) => theme.shape.borderRadius}px;
        transition: background-color 0.3s ease, color 0.3s ease;
        
        &:hover {
            opacity: 0.9;
        }
    }

    /* Inputs */
    input, textarea, select {
        font-family: inherit;
        border: 1px solid ${({ theme }) => theme.palette.divider};
        padding: ${({ theme }) => theme.spacing(2)};
        border-radius: ${({ theme }) => theme.shape.borderRadius}px;
        color: ${({ theme }) => theme.palette.text.primary};
        background-color: ${({ theme }) => theme.palette.background.paper};
        
        &:focus {
            border-color: ${({ theme }) => theme.palette.primary.main};
            outline: none;
        }
    }

    /* Lists */
    ul, ol {
        padding-left: ${({ theme }) => theme.spacing(4)};
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }

    li {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }
    
    /* Scrollbar styles */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.palette.primary.main};
        border-radius: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.palette.background.default};
    }
`;

export default GlobalStyle;
