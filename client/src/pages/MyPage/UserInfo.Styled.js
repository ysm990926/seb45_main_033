import { styled } from 'styled-components';

export const BodyContainer=styled.div`
 width: 1000px;
`

export const InfoTextBox = styled.div`
  border-bottom: 3px solid black;
  height: 50px;
  font-size: 25px;
  display: flex;
  align-items: center;
`

export const ImageBox = styled.div`
   
   height: 200px;
   display: flex;
   gap: 30px;
   box-shadow: 0px 1px 5px #00000033;
   overflow: hidden;
   >div{
    white-space: nowrap;
   }
`

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 45px;
`

export const Text= styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
  box-shadow: 1px 1px 5px #00000033;
`

export const ImageTextBox = styled.div`
margin-top: 5px;
 display: flex;
 flex-direction: column;
 gap: 30px;
`

export const ChangeImage = styled.input`
height: 30px;
margin-top: 45px;
`

export const NickNameBox = styled.div`
display: flex;
height: 50px;
box-shadow: 0px 1px 5px #00000033;
gap: 30px;
`

export const NickNameText = styled.input`
 width: 415.63px;
`

export const ChangeBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 45px;
  border: 1px solid black;
  margin-top: 10px;
`

export const EmailBox = styled(NickNameBox)`

`

export const EmailText = styled(NickNameText)`

`


export const PassWordBox = styled(NickNameBox)`

`

export const PassWordText = styled.input`
width: 415.63px;
`

export const PwErrText = styled.span`
  color: red;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
`