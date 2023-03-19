import instance from "@/axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export interface SelectedDday {
  exam: string;
  dday: string;
}

interface ModalProps {
  visible: boolean;
  selecteExam: SelectedDday;
}

export default function BottomModal({ visible, selecteExam }: ModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteDday = async (selectedDday: string) => {
    await instance.delete(`api/calculate/removeDay?exam=${selectedDday}`);
  };

  const { mutateAsync: deleteDdayMutate } = useMutation(deleteDday, {
    mutationKey: "ddayInfo",
    onSuccess: () => queryClient.invalidateQueries("ddayInfo"),
  });

  return (
    <BottomContainer visible={visible}>
      <button onClick={() => deleteDdayMutate(selecteExam.exam)}>
        삭제하기
      </button>
      <button onClick={() => navigate("/makedday")}>추가하기</button>
      <button
        onClick={() =>
          navigate(`/makedday/${selecteExam.exam}/${selecteExam.dday}`)
        }
      >
        수정하기
      </button>
    </BottomContainer>
  );
}

const BottomContainer = styled.div<{ visible: boolean }>`
  position: absolute;

  display: ${(props) => (props.visible ? "flex" : "none")};
`;
