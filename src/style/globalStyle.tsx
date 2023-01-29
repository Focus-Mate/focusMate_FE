import styled, { createGlobalStyle } from "styled-components";
import Theme from "./theme";
import {
  SpoqaRegular,
  SpoqaLight,
  SpoqaMedium,
  SpoqaThin,
  SpoqaBold,
} from "./fonts/index";

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
*{
  box-sizing: border-box;
}
html{
}
body {
width: 100%;
height: 100%;
font-family:"SpoqaRegular"
}
h1, h2, h3, h4, h5, h6{
  font-family:"SpoqaMedium"

}
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 16px;
  border: 0px solid transparent;
  background-color: #f6f6f6;
  padding: 23px;
  outline-color: #34dbc4;
  caret-color: #34dbc4;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? Theme.colors.bg.line : Theme.colors.primary[700]};
`;
