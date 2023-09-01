import { styled } from 'styled-components';

export const MypageContainer=styled.section`
overflow: auto;
display: flex;
gap: 25vh;
`

export const TapContainer = styled.div`
width: 165px;
height: 100px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const Tap = styled.button`
width: 165px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
border-right: ${(props)=>props.stroke ? "5px solid #E2990B" : "5px solid #DBDBDB"};
`