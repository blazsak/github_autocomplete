import React from 'react';
import styled from 'styled-components';
export function ListItemAvatar({
    src = '',
    alt = '',
}: {
    src?: string;
    alt?: string;
}): JSX.Element {
    return (
        <ListItemAvatarSrc>
            {src !== '' && <img src={src} alt={alt} width={60} height={60} />}
        </ListItemAvatarSrc>
    );
}

const ListItemAvatarSrc = styled.div`
    width: 65px;
    height: 60px;
    overflow: hidden;
    background-color: #eaeaea;
    margin-right: auto;
    img {
        vertical-align: top;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
