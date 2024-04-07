import { css, FlattenSimpleInterpolation } from 'styled-components';

interface IFontsTheme {
  fonts: {
    spoqa: {
      thin: FlattenSimpleInterpolation;
      light: FlattenSimpleInterpolation;
      regular: FlattenSimpleInterpolation;
      medium: FlattenSimpleInterpolation;
      bold: FlattenSimpleInterpolation;
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
      thin: css`
        font-family: 'SpoqaHanSansNeo', sans-serif;
        font-weight: 200;
      `,
      light: css`
        font-family: 'SpoqaHanSansNeo', sans-serif;
        font-weight: 300;
      `,
      regular: css`
        font-family: 'SpoqaHanSansNeo', sans-serif;
        font-weight: 400;
      `,
      medium: css`
        font-family: 'SpoqaHanSansNeo', sans-serif;
        font-weight: 500;
      `,
      bold: css`
        font-family: 'SpoqaHanSansNeo', sans-serif;
        font-weight: 700;
      `,
    },
  },
  typography: {
    headline: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 36px;
      `,
    },
    bigTitle: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 24px;
      `,
    },
    title: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 20px;
      `,
      bold: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 700;
        font-size: 20px;
      `,
    },
    body: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 16px;
      `,
      bold: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 700;
        font-size: 16px;
      `,
    },
    subText: {
      regular: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 400;
        font-size: 14px;
      `,
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 14px;
      `,
    },
    caption: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 12px;
      `,
      bold: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 700;
        font-size: 12px;
      `,
    },
    noti: {
      medium: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 500;
        font-size: 10px;
      `,
      bold: css`
        font-family: 'SpoqaHanSansNeo', serif;
        font-weight: 700;
        font-size: 10px;
      `,
    },
  },
};
