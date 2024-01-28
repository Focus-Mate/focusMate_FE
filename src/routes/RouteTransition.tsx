import React, { ReactElement } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

interface RouteTransitionProps {
  location: {
    pathname?: string;
    state?: {
      direction: string;
    };
  };
  children: React.ReactNode;
}

const RouteTransition = ({ location, children }: RouteTransitionProps) => {
  const pathname = location.pathname;
  const state = location.state;
  return (
    <Container>
      <TransitionGroup
        className={'transition-wrapper'}
        childFactory={(child: ReactElement) => {
          return React.cloneElement(child, {
            classNames: state?.direction || 'navigate',
          });
        }}
      >
        <CSSTransition exact key={pathname} timeout={600}>
          {children}
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};

export default RouteTransition;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  position: relative;
  overflow: scroll;

  .transition-wrapper {
    width: 100%;
    height: 100%;
  }

  .navigate-pop-enter {
    transform: translateX(-50%);
  }

  .navigate-pop-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .navigate-pop-exit {
    transform: translateX(0);
  }

  .navigate-pop-exit-active {
    z-index: 1;
    transform: translateX(100%);
    transition: transform 300ms ease-in-out;
  }

  .navigate-push-enter {
    transform: translateX(100%);
  }

  .navigate-push-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .navigate-push-exit {
    transform: translateX(0);
  }

  .navigate-push-exit-active {
    transform: translateX(-100%);
    transition: transform 600ms ease-in-out;
  }

  .navigate-enter {
    transform: translateX(100%);
  }

  .navigate-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 0ms ease-in-out;

    box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .navigate-exit {
    transform: translateX(0);
  }

  .navigate-exit-active {
    transform: translateX(-100%);
    transition: transform 0ms ease-in-out;
  }

  .transition-wrapper {
    position: relative;
    width: 100vw;
  }
`;
