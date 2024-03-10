import styled, { createGlobalStyle } from 'styled-components';
import Theme from './lightTheme';
import {
  SpoqaRegular,
  SpoqaLight,
  SpoqaMedium,
  SpoqaThin,
  SpoqaBold,
} from './fonts/index';

//전역 스타일링
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaRegular';
    src: local('SpoqaRegular'), local('SpoqaRegular');
    font-style: normal;
    src: url(${SpoqaRegular}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaLight';
    src: local('SpoqaLight'), local('SpoqaLight');
    font-style: normal;
    src: url(${SpoqaLight}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaMedium';
    src: local('SpoqaMedium'), local('SpoqaMedium');
    font-style: normal;
    src: url(${SpoqaMedium}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaThin';
    src: local('SpoqaThin'), local('SpoqaThin');
    font-style: normal;
    src: url(${SpoqaThin}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaBold';
    src: local('SpoqaBold'), local('SpoqaBold');
    font-style: normal;
    src: url(${SpoqaBold}) format('truetype');
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
    font-family: "SpoqaRegular";
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
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 16px;
  border: 0px solid transparent;
  background-color: ${Theme.colors.bg.grey};
  padding: 23px;
  outline-color: ${Theme.colors.bg.mint30};
  caret-color: ${Theme.colors.bg.mint30};

  &.error {
    outline-color: ${Theme.colors.orange[900]};
    caret-color: ${Theme.colors.orange[900]};
  }
`;

export const Button = styled.button`
  background-color: ${props =>
    props.disabled ? Theme.colors.bg.line : Theme.colors.primary[700]};
  border-radius: 16px;
  font-family: 'SpoqaBold';
  color: ${props =>
    props.disabled ? Theme.colors.grey[500] : Theme.colors.bg.base};
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
`;

export const SignInStepButton = styled(Button)`
  position: absolute;
  bottom: 16px;
`;
