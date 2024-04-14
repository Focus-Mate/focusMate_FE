import styled, { createGlobalStyle } from 'styled-components';
import {
  SpoqaRegular,
  SpoqaLight,
  SpoqaMedium,
  SpoqaThin,
  SpoqaBold,
} from '../assets/fonts/index';

//전역 스타일링
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaThin}) format('woff2');
    font-style: normal;
    font-weight: 200;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaLight}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaMedium}) format('woff2');
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaBold}) format('woff2');
    font-style: normal;
    font-weight: 700;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }

  * {
  box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  }
  
  body {
    line-height: 1;
    overflow-x: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;  
    box-sizing: border-box;
  }

  /* h1, h2, h3, h4, h5, h6 {
    font-family:"SpoqaMedium"
  } */

  a {
    text-decoration: none;
  }

  div::-webkit-scrollbar {
    display: none;
  }

  div {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  html, body {
    font-family: 'SpoqaHanSansNeo', sans-serif;
    font-weight: 400;
  }
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 16px;
  border: 0px solid transparent;
  background-color: ${({ theme }) => theme.colors.bg.grey};
  padding: 23px 20px;
  outline-color: ${({ theme }) => theme.colors.bg.mint30};
  caret-color: ${({ theme }) => theme.colors.bg.mint30};
  font-size: 16px;

  &.error {
    outline-color: ${({ theme }) => theme.colors.orange[900]};
    caret-color: ${({ theme }) => theme.colors.orange[900]};
  }
`;

export const Button = styled.button`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.bg.line
      : props.theme.colors.primary[700]};
  border-radius: 16px;
  ${({ theme }) => theme.fonts.spoqa.bold};
  color: ${props =>
    props.disabled ? props.theme.colors.grey[500] : props.theme.colors.bg.base};
  width: 100%;
  padding: 16px 0px;
  border: 0px solid transparent;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

export const Title = styled.h1`
  padding-top: 57px;
  font-size: 1.5rem;
  word-break: keep-all;
  line-height: 32px;
  margin-bottom: 40px;

  ${({ theme }) => theme.typography.bigTitle.medium};
`;

export const SignInStepButton = styled(Button)`
  position: absolute;
  bottom: 16px;
`;
