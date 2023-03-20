import instance from "@/axios";
import { Title } from "@/style/globalStyle";
import React, { Dispatch, useState } from "react";
import ReactModal from "react-modal";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "@/style/icon/close.svg";
import { AddIcon, DeleteIcon, EditIcon } from "@/style/icon/dday";
import FloatingModal from "../FloatingModal";
export interface SelectedDday {
  exam: string;
  dday: string;
}

interface ModalProps {
  visible: boolean;
  selecteExam: SelectedDday;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const customStyles = {
  overlay: {
    backgroundColor: "transparent",
    zIndex: 10,
    overflow: "hidden",
  },
  content: {
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    height: "100%",
    borderRadius: 0,
    border: 0,
    padding: 0,
    overflow: "hidden",
  },
};

export default function BottomModal({
  visible,
  setVisible,
  selecteExam,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteDday = async (selectedDday: string) => {
    await instance.delete(`api/calculate/removeDay?exam=${selectedDday}`);
  };

  const { mutateAsync: deleteDdayMutate } = useMutation(deleteDday, {
    mutationKey: "ddayInfo",
    onSuccess: () => {
      queryClient.invalidateQueries("ddayInfo");
      setVisible(false);
    },
  });

  const onClickDeleteDday = () => {
    setIsOpen(true);
    setVisible(false);
  };

  return (
    <>
      <FloatingModal
        isOpen={isOpen}
        modalContent={{
          comment: "D-DAY를 삭제할까요?",
          options: [
            {
              id: 1,
              guide: "아니요",
              action: () => {
                setVisible(true);
                setIsOpen(false);
              },
            },
            {
              id: 2,
              guide: "네, 삭제할게요",
              action: () => {
                deleteDdayMutate(selecteExam.exam);
                setIsOpen(false);
              },
            },
          ],
        }}
      />

      <ReactModal isOpen={visible} style={customStyles}>
        <BottomContainer>
          <Content>
            <ContentTitle>
              D-DAY 설정 <CloseBtn onClick={() => setVisible(false)} />
            </ContentTitle>
            <SettingDday onClick={onClickDeleteDday} className="delete">
              <DeleteIcon /> 삭제하기
            </SettingDday>
            <SettingDday onClick={() => navigate("/makedday")}>
              <AddIcon /> 추가하기
            </SettingDday>
            <SettingDday
              onClick={() =>
                navigate(`/makedday/${selecteExam.exam}/${selecteExam.dday}`)
              }
            >
              <EditIcon /> 수정하기
            </SettingDday>
          </Content>
        </BottomContainer>
      </ReactModal>
    </>
  );
}

const BottomContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.dim};
`;

const Content = styled.div`
  background-color: #fff;
  padding: 24px 20px 72px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  z-index: 100;
  gap: 12px;
  border-radius: 12px 12px 0px 0px;
`;

const CloseBtn = styled(CloseIcon)`
  cursor: pointer;
`;

const ContentTitle = styled.div`
  font-size: 1.25rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SettingDday = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg.grey};
  border-radius: 12px;
  padding: 16px;

  &.delete {
    color: ${({ theme }) => theme.colors.icon.orange50};
  }
`;
