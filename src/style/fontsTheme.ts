import { css, FlattenSimpleInterpolation } from 'styled-components';

interface IFontsTheme {
  fonts: {
    spoqa: {
      thin: string;
      light: string;
      regular: string;
      medium: string;
      bold: string;
    };
  };
  typography: {
    headline: {
      medium: FlattenSimpleInterpolation;
    };
    bigTitle: {
      medium: FlattenSimpleInterpolation;
    };
    title: {
      medium: FlattenSimpleInterpolation;
      bold: FlattenSimpleInterpolation;
    };
    body: {
      medium: FlattenSimpleInterpolation;
      bold: FlattenSimpleInterpolation;
    };
    subText: {
      regular: FlattenSimpleInterpolation;
      medium: FlattenSimpleInterpolation;
    };
    caption: {
      medium: FlattenSimpleInterpolation;
      bold: FlattenSimpleInterpolation;
    };
    noti: {
      medium: FlattenSimpleInterpolation;
      bold: FlattenSimpleInterpolation;
    };
  };
}

export const fontsTheme: IFontsTheme = {
  fonts: {
    spoqa: {
      thin: 'SpoqaThin',
      light: 'SpoqaLight',
      regular: 'SpoqaRegular',
      medium: 'SpoqaMedium',
      bold: 'SpoqaBold',
    },
  },
  typography: {
    headline: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 36px;
      `,
    },
    bigTitle: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 24px;
      `,
    },
    title: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 20px;
      `,
      bold: css`
        font-family: SpoqaBold, serif;
        font-size: 20px;
      `,
    },
    body: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 16px;
      `,
      bold: css`
        font-family: SpoqaBold, serif;
        font-size: 16px;
      `,
    },
    subText: {
      regular: css`
        font-family: SpoqaRegular, serif;
        font-size: 14px;
      `,
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 14px;
      `,
    },
    caption: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 12px;
      `,
      bold: css`
        font-family: SpoqaBold, serif;
        font-size: 12px;
      `,
    },
    noti: {
      medium: css`
        font-family: SpoqaMedium, serif;
        font-size: 10px;
      `,
      bold: css`
        font-family: SpoqaBold, serif;
        font-size: 10px;
      `,
    },
  },
};
