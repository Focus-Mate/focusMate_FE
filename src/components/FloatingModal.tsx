import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { customStyles } from './chart/BottomModal';

type options = {
  action: () => void | React.Dispatch<React.SetStateAction<any>>;
  guide: string;
  id: number;
};

type modalContent = {
  comment: string;
  options: options[];
};

interface ModalProps {
  modalContent: modalContent;
  isOpen: boolean;
}

export default function FloatingModal({ modalContent, isOpen }: ModalProps) {
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <ModalContainer>
        <ModalContent>
          <Comment>{modalContent.comment}</Comment>

          <OptionsWrapper>
            {modalContent.options.map(option => {
              return (
                <Option
                  onClick={option.action}
                  key={option.id}
                  className={`option-${option.id}`}
                >
                  {option.guide}
                </Option>
              );
            })}
          </OptionsWrapper>
        </ModalContent>
      </ModalContainer>
    </ReactModal>
  );
}

const ModalContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.dim};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.base};
  color: ${({ theme }) => theme.colors.grey[900]};
  padding: 16px;
  width: 80%;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: auto;
  top: 50%;
  left: 50%;
  right: auto;
  transform: translate(-50%, -50%);
  z-index: 100;

  border-radius: 12px;
  text-align: center;
`;

const Comment = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Option = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: 12px;
  padding: 13px;
  font-size: 0.875rem;

  &.option-1 {
    color: ${({ theme }) => theme.colors.primary[900]};
    background-color: ${({ theme }) => theme.colors.bg.mint20};
  }

  &.option-2 {
    color: ${({ theme }) => theme.colors.bg.base};
    background-color: ${({ theme }) => theme.colors.primary[800]};
  }
`;
