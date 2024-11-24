import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';

interface Props {
  active: boolean;
}

export function GnbTimer(props: Props) {
  const theme = useTheme();

  const colorVariants = {
    active: {
      fill: '#005F6C',
      stroke: '#005F6C',
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      fill: theme.colors.grey[400],
      stroke: theme.colors.grey[400],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={props.active ? 'active' : 'inactive'}
    >
      <g clipPath="url(#clip0_967_3041)">
        <motion.circle
          cx="23"
          cy="25"
          r="9"
          fill="#B2F2F2"
          animate={props.active ? 'active' : 'inactive'}
          variants={{
            active: {
              opacity: 1,
              transition: {
                duration: 0.1,
              },
            },
            inactive: {
              opacity: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
        />
        <motion.path
          d="M23.7193 34.6923C21.7551 34.6923 19.8349 34.1285 18.2017 33.0724C16.5685 32.0162 15.2957 30.515 14.5441 28.7587C13.7926 27.0025 13.5962 25.0699 13.9797 23.2056C14.3632 21.3413 15.3094 19.6288 16.6986 18.285C18.0878 16.9411 19.8577 16.026 21.7843 15.6556C23.7109 15.2852 25.7078 15.4761 27.5224 16.2041C29.3369 16.932 30.8876 18.1644 31.9783 19.7453C33.0691 21.3262 33.6509 23.1847 33.6501 25.0856C33.6471 27.6332 32.5997 30.0755 30.7379 31.8766C28.876 33.6777 26.3519 34.6903 23.7193 34.6923ZM23.7193 17.3362C22.1356 17.3362 20.5874 17.7907 19.2705 18.6422C17.9537 19.4937 16.9273 20.704 16.3212 22.12C15.7151 23.536 15.5565 25.0942 15.8655 26.5974C16.1745 28.1006 16.9372 29.4815 18.0571 30.5652C19.1769 31.649 20.6038 32.387 22.1571 32.6861C23.7105 32.9851 25.3205 32.8316 26.7838 32.2451C28.247 31.6585 29.4976 30.6653 30.3775 29.3909C31.2574 28.1165 31.727 26.6183 31.727 25.0856C31.725 23.0309 30.8807 21.061 29.3794 19.6081C27.8781 18.1553 25.8425 17.3382 23.7193 17.3362Z"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.path
          d="M26.308 29.1465C26.1457 29.1451 25.9867 29.1027 25.8465 29.0237L23.2541 27.5758C23.1075 27.4948 22.9856 27.3778 22.9005 27.2367C22.8154 27.0956 22.7703 26.9352 22.7695 26.7719V21.9518C22.7695 21.705 22.8708 21.4683 23.0512 21.2938C23.2315 21.1193 23.4761 21.0212 23.7311 21.0212C23.9861 21.0212 24.2307 21.1193 24.411 21.2938C24.5913 21.4683 24.6926 21.705 24.6926 21.9518V26.2359L26.8041 27.4121C26.9877 27.5155 27.1306 27.6749 27.2107 27.8652C27.2908 28.0556 27.3035 28.2663 27.2468 28.4644C27.1902 28.6624 27.0673 28.8368 26.8975 28.9602C26.7277 29.0836 26.5204 29.1491 26.308 29.1465Z"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.line
          x1="23.9229"
          y1="13.8489"
          x2="23.9229"
          y2="17.1988"
          strokeWidth="2.30769"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.line
          x1="20.6539"
          y1="13.6315"
          x2="27.1924"
          y2="13.6315"
          strokeWidth="1.92308"
          strokeLinecap="round"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
      </g>
      <defs>
        <clipPath id="clip0_967_3041">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </motion.svg>
  );
}
