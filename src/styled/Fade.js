import styled from 'styled-components';
import { fade } from './keyframes';

const Fade = styled.div`
    animation: ${fade} ${(props) => props.time} ease;
`;

export default Fade;
