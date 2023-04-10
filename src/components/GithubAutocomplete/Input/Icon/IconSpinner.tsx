import React from 'react';
import styled from 'styled-components';
export function IconSpinner({ ...otherProps }): JSX.Element {
    return (
        <SvgSpinner viewBox="0 0 50 50" {...otherProps}>
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        </SvgSpinner>
    );
}

const SvgSpinner = styled.svg`
    animation: spinner-rotate 2s linear infinite;
    z-index: 2;

    > circle {
        stroke: currentColor;
        stroke-linecap: round;
        animation: spinner-dash 1.5s ease-in-out infinite;
    }

    @keyframes spinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes spinner-dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;
