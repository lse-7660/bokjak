import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, font } from '../styled/theme';
import { media } from '../styled/media';
import { useSelector } from 'react-redux';

export const ContentFlipCardWrap = styled.div`
    width: 100%;
    max-width: 313px;
    height: auto;
    aspect-ratio: 3/4;

    border-radius: 10px;
    background-color: ${color('gray', '70')};

    transition: all 0.3s ease;

    div {
        &.content-flip-card-wrap {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            height: 100%;
            padding: 40px 20px;
        }

        &.content-flip-card-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            span {
                font-size: ${font('detail', 'md')};
                color: ${color('gray', '30')};
            }
        }
        &.content-flip-card-preview {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 10px;
            img {
                width: 100%;
            }
        }
    }

    p {
        &.content-flip-card-title {
            width: auto;
            font-size: ${font('title', 'xlg')};
            font-weight: 600;
            text-align: left;
            word-wrap: break-word;

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        &.content-flip-card-desc {
            text-align: left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
            overflow: hidden;
        }
    }

    ${media.desktop} {
        &:hover {
            background-color: ${color('gray', '70')};
            transform: translateY(-20px);
        }
    }
`;

const ContentFlipCard = ({ content }) => {
    const [isShow, setIsShow] = useState(false);
    const bgurl = `https://image.tmdb.org/t/p/w500`;
    const { width } = useSelector((state) => state.windowR);

    return (
        <ContentFlipCardWrap
            onMouseEnter={() => {
                if (width > 1024) setIsShow(true);
            }}
            onMouseLeave={() => {
                if (width > 1024) setIsShow(false);
            }}
        >
            {!isShow && (
                <div className="content-flip-card-preview">
                    <img
                        src={`${bgurl}${content.poster_path}`}
                        alt=""
                    />
                </div>
            )}

            {isShow && (
                <div className="content-flip-card-wrap">
                    <p className="content-flip-card-title">
                        {content.title
                            ? content.title
                            : content.name}
                    </p>

                    <div className="content-flip-card-tags">
                        <span>
                            {
                                content.release_date?.split(
                                    '-'
                                )[0]
                            }
                        </span>
                        {content.genre_names &&
                            content.genre_names
                                .slice(0, 3)
                                .map((item, idx) => (
                                    <span key={idx}>
                                        {item}
                                    </span>
                                ))}
                    </div>
                    <p className="content-flip-card-desc">
                        {content.overview || ''}
                    </p>
                </div>
            )}
        </ContentFlipCardWrap>
    );
};

export default ContentFlipCard;
