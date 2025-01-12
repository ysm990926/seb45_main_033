import { styled } from "styled-components";

export const ModalBackground = styled.section`
width: 100%;
height: 100%;
position: fixed;
left: 0;
top: 0;
background: rgba(0, 0, 0, 0.5);
z-index: 999;
`

export const ModalBody = styled.section`
  position: fixed;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 373px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #6B6B6B;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalText = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-top: 10px;
  font-size: medium;
  font-weight: normal;
`;


export const ModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
  gap: 10px;
`;



export const ModalBtn = styled.button`
  background-color: #D0C5B0;
  color: #FFFFFF;
  border: none !important;
  border-radius: 8px;
  padding: 9px 15px;
  cursor: pointer;
  width: 62px;
  height: 39px;
  outline: none;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #D0C5B0 !important;
  }
`;

export const DeleteModalBody = styled(ModalBody)`
 height: 200px;
`

export const DeleteModalText = styled(ModalText)`
 flex-direction: column;
`

export const InputContainer = styled.div`
 display: flex;
 justify-content: center;
 width: 100%;
`

export const DeleteText = styled.div`
color: red;
`

export const DeleteMessage = styled.div`
color: red;
font-size: 0.8em;
`

export const DeleteMessageContainer = styled(InputContainer)`

`

export const DeleteInput = styled.input`
width: 90%;
border: 1px solid black;
padding: 0 10px;
`