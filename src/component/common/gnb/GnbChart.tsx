import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';

interface Props {
  active: boolean;
}

export default function GnbChart(props: Props) {
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
      variants={{
        active: {
          transform: 'scale(1.2)',
          transition: {
            duration: 0.3,
          },
        },
        inactive: {
          transform: 'scale(1.0)',
          transition: {
            duration: 0.3,
          },
        },
      }}
    >
      <g clipPath="url(#clip0_699_3162)">
        <motion.rect
          x="13"
          y="13"
          width="22"
          height="22"
          rx="4"
          fill="#87E4DA"
          animate={props.active ? 'active' : 'inactive'}
          variants={{
            active: {
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            },
            inactive: {
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
        />
        <motion.rect
          x="18.6191"
          y="25.5472"
          width="2.30943"
          height="5.38868"
          fill="#005F6C"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.rect
          x="23.2378"
          y="17.8491"
          width="2.30943"
          height="13.0868"
          fill="#005F6C"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.rect
          x="27.8564"
          y="21.6982"
          width="2.30943"
          height="9.23773"
          fill="#005F6C"
          animate={props.active ? 'active' : 'inactive'}
          variants={colorVariants}
        />
        <motion.rect
          x="14"
          y="13.9999"
          width="20.4"
          height="20.4"
          rx="3.2"
          stroke="#005F6C"
          strokeWidth="2.4"
          animate={props.active ? 'active' : 'inactive'}
          variants={{
            active: {
              stroke: '#005F6C',
              transition: {
                duration: 0.3,
              },
            },
            inactive: {
              stroke: theme.colors.grey[400],
              transition: {
                duration: 0.3,
              },
            },
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_699_3162">
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
