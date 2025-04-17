import {
    CaretLeft,
    CaretRight,
} from '@phosphor-icons/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getContentByGenre,
    getContentDetail,
    getMovies,
    getTvShows,
} from '../../../store/modules/getThunk';
import { Link, useLocation } from 'react-router-dom';
import {
    ThumbnailContainer,
    ThumbnailHeader,
    ThumbnailList,
} from './style';
import ThumbnailCard from '../../../ui/ThumbnailCard';
import { NavigationButton } from './style';
import { IconButton } from '../../../ui';

const SubThumbnailContList = ({
    title,
    contents = [],
    noContentText,
}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { movies, tvShows } = useSelector(
        (state) => state.contentR
    );

    useEffect(() => {
        if (!movies || !tvShows) {
            dispatch(getMovies());
            dispatch(getTvShows());
        }
    }, [dispatch, movies, tvShows]);

    const showDetailModal = (type, id, genreId) => {
        dispatch(getContentDetail({ type, id }));
        dispatch(getContentByGenre({ type, genreId }));
    };

    const swiperRef = useRef();

    const goNext = () => {
        swiperRef.current?.swiper.slideNext();
    };
    const goPrev = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    return (
        <ThumbnailContainer>
            <ThumbnailHeader>
                <h2>{title}</h2>
                <Link>
                    <h3>더보기</h3>
                </Link>
            </ThumbnailHeader>
            {contents && contents.length > 0 ? (
                <ThumbnailList>
                    <Swiper
                        className="swiper"
                        ref={swiperRef}
                        modules={[Navigation]}
                        navigation={false}
                        breakpoints={{
                            330: {
                                slidesPerView: 2.8,
                                slidesPerGroup: 1,
                                spaceBetween: 10,
                            },
                            390: {
                                slidesPerView: 3.1,
                                slidesPerGroup: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4.2,
                                slidesPerGroup: 1,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 5.1,
                                slidesPerGroup: 5,
                                spaceBetween: 24,
                            },
                        }}
                    >
                        {contents.map((content, index) => (
                            <SwiperSlide
                                key={`${content.id}-${index}`}
                            >
                                <Link
                                    to={`/${content.media_type}/${content.id}`}
                                    state={{
                                        previousLocation:
                                            location,
                                    }}
                                >
                                    <ThumbnailCard
                                        content={content}
                                        onClick={() =>
                                            showDetailModal(
                                                content.media_type,
                                                content.id,
                                                content.genre_ids
                                            )
                                        }
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <NavigationButton>
                        <IconButton
                            onClick={goPrev}
                            className="b30"
                            icon={<CaretLeft size={24} />}
                            text="caretLeft"
                        />
                        <IconButton
                            onClick={goNext}
                            className="b30"
                            icon={<CaretRight size={24} />}
                            text="caretRight"
                        />
                    </NavigationButton>
                </ThumbnailList>
            ) : (
                <div className="noContentWrap">
                    <p>{noContentText}</p>
                </div>
            )}
        </ThumbnailContainer>
    );
};

export default SubThumbnailContList;
