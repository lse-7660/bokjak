import { BarButton, Dimmed, IconButton } from '../../../ui';
import { BellSimple, Play, X } from '@phosphor-icons/react';
import AgeLabel from '../../../ui/AgeLabel';
import {
    ButtonGroup,
    ImageCont,
    LabelWrapper,
    ModalCont,
    SooncardCont,
    SoonItemCont,
    TextCont,
} from './style';
import genres from '../../../assets/api/genreData';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../store/modules/authSlice';

const SoonContItem = ({ content, ...props }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authed, user } = useSelector(
        (state) => state.authR
    );
    const isSoonAlarm =
        authed &&
        user?.soonAlarm?.some(
            (item) => item.id === content.id
        );

    const bgurl = `https://image.tmdb.org/t/p/original`;
    const logoUrl = content.logoImage
        ? `https://image.tmdb.org/t/p/original${content.logoImage}`
        : null;
    const age = content.age_rating || 'ALL';
    const desc = content.overview;
    const title = content.title;
    const date = content.release_date;
    const year = date ? date.split('-')[0] : '정보 없음';
    const genreNames =
        content.genre_ids
            ?.map((id) => {
                const genre = genres.find(
                    (genre) => genre.id === id
                ); // 장르 데이터에서 id로 매칭
                return genre ? genre.name : null; // 장르 이름 반환, 없으면 null
            })
            .filter(Boolean) // null, undefined 제거
            .join(' · ') || '장르 없음';

    const soonDateTime = content.release_date;
    const month = soonDateTime?.split('-')[1];
    const day = soonDateTime?.split('-')[2];

    const soonDateText =
        month && day
            ? `${month}월 ${day}일 공개`
            : '발표 예정일 없음';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBellClick = (e) => {
        e.preventDefault();
        if (authed) {
            dispatch(authActions.setSoonAlarm(content));
        } else {
            navigate('/login');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && (
                <ModalCont>
                    <Dimmed>
                        <div className="modalContent">
                            <h2>{title}</h2>
                            <h3>
                                알림 설정이 완료되었습니다!
                            </h3>
                            <IconButton
                                className="none"
                                icon={<X size={24} />}
                                text="close"
                                onClick={closeModal}
                            />
                        </div>
                    </Dimmed>
                </ModalCont>
            )}
            <SoonItemCont {...props}>
                <h2 className="soonDate">{soonDateText}</h2>
                <SooncardCont>
                    <ImageCont>
                        <img
                            src={`${bgurl}${content.backdrop_path}`}
                            alt={title}
                        />
                        <div className="icon">
                            <IconButton
                                className="border"
                                icon={
                                    <Play
                                        size={24}
                                        weight="fill"
                                    />
                                }
                                text="Play"
                            />
                        </div>
                    </ImageCont>
                    <TextCont>
                        <div className="soonLogo">
                            <img
                                src={content.logoImage}
                                alt={content.title}
                            />

                            <IconButton
                                className="soonIconTop"
                                icon={
                                    isSoonAlarm ? (
                                        <BellSimple
                                            size={24}
                                            weight="fill"
                                        />
                                    ) : (
                                        <BellSimple
                                            size={24}
                                        />
                                    )
                                }
                                text="BellSimple"
                                onClick={handleBellClick}
                            />
                        </div>
                        <div className="textarea">
                            <h2>{soonDateText}</h2>
                            <LabelWrapper>
                                <AgeLabel text={age} />
                                <em>·</em>
                                <span>{year}</span>
                                <em>·</em>
                                <span>{genreNames}</span>
                            </LabelWrapper>
                            <p>{desc}</p>
                        </div>
                        <ButtonGroup>
                            <BarButton
                                text="미리보기"
                                width="366px"
                                height="42px"
                            />
                            <IconButton
                                icon={
                                    isSoonAlarm ? (
                                        <BellSimple
                                            size={24}
                                            weight="fill"
                                        />
                                    ) : (
                                        <BellSimple
                                            size={24}
                                        />
                                    )
                                }
                                text="BellSimple"
                                onClick={handleBellClick}
                            />
                        </ButtonGroup>
                    </TextCont>
                </SooncardCont>
            </SoonItemCont>
        </>
    );
};

export default SoonContItem;
