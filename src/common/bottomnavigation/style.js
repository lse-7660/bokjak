import styled from 'styled-components';
import { color } from '../../styled/theme';
import { media } from '../../styled/media';

export const BottomNavList = styled.ul`
    ${media.desktop} {
        display: none;
    }

    ${media.tablet} {
        display: none;
    }

    ${media.mobile} {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: auto;
        background: ${color('gray', '90')};
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        padding: 8px 5px;
    }

    li {
        color: ${color('gray', '40')};
        justify-content: center;
        text-align: center;

        &:hover {
            color: ${color('gray', '0')};
            svg {
                fill: ${color('gray', '0')};
            }
        }
    }
`;
