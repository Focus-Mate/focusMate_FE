import ReactModal from 'react-modal';
import styled from 'styled-components';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '280px',
    height: '120px',
    top: '50%',
    left: '50%',
    border: 'none',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    padding: 0,
  },
};

interface ConfirmPopProps {
  options: {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    onCancelText: string;
    onConfirmText: string;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
  };
}

const ConfirmPop: React.FC<ConfirmPopProps> = ({ options }) => {
  return (
    <ReactModal isOpen={options.isOpen} style={modalStyle}>
      <Container>
        <Text>{options.message}</Text>
        <ButtonGroup>
          <CancelButton onClick={() => options.onCancel()}>
            {options.onCancelText}
          </CancelButton>
          <ConfirmButton onClick={() => options.onConfirm()}>
            {options.onConfirmText}
          </ConfirmButton>
        </ButtonGroup>
      </Container>
    </ReactModal>
  );
};

export default ConfirmPop;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SpoqaMedium';
  padding: 24px 20px 16px;
  background-color: ${({ theme }) => theme.colors.bg.elevated};
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.spoqa.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const ButtonGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  width: 110px;
  height: 40px;
  background-color: transparent;
  border: 0;
  border-radius: 0.75rem;
`;

const CancelButton = styled(Button)`
  background-color: #f2f2f2;
  background-color: ${({ theme }) => theme.colors.bg.mint20};
  color: ${({ theme }) => theme.colors.primary[900]};
`;

const ConfirmButton = styled(Button)`
  width: 130px;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  color: ${({ theme }) => theme.colors.bg.base};
`;
