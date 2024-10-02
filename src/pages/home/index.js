import styled from 'styled-components';
import Layout from '@app/shared/layout';
import { useEffect } from 'react';
import gachaHeaderWordingImg from '@app/static/gacha-header.png';
import headerBg from '@app/static/header-bg.png';
import Products from '@app/shared/products';
import BaseCarousel from '@app/shared/carousel';
import { useSelector, dataStore } from '@app/store';
import {
	CATEGORY,
	DEFAULT_COMMODITIES_PAGINATION,
	COMMODITY_STATUS,
} from '@app/utils/constants';
import newArrivalsImg from '@app/static/new-arrivals.png';

const ImageContainer = styled.div`
	overflow: hidden;
	position: relative;
	img {
		margin: 10px;
		width: 100%;
		height: auto;
		@media (max-width: 768px) {
			margin: 0;
		}
	}
`;

const Carousel = styled(BaseCarousel)`
	margin: 0 auto 30px;
	padding: 16px 8px;
	.slick-slide {
		opacity: 0.5;
		transform: scale(0.8);
	}
	.slick-slide.slick-current + .slick-slide {
		opacity: 1;
		transform: scale(1.1);
		margin-top: 5px;
	}
	@media (max-width: 768px) {
		.slick-slide.slick-current + .slick-slide,
		.slick-slide {
			opacity: 1;
			transform: scale(1);
			margin-top: 0;
		}
	}
`;

const NewArrivalTag = styled.img.attrs({ src: newArrivalsImg })`
	position: absolute;
	top: 0;
	left: 0;
	width: 25% !important;
	height: auto !important;
`;

export default function Home() {
	const commodities = useSelector(() => dataStore.commodities);
	const newAds = useSelector(() => dataStore.newAds);

	useEffect(() => {
		const req = {
			category: CATEGORY.GACHA,
			status: COMMODITY_STATUS.OPENING,
			...DEFAULT_COMMODITIES_PAGINATION,
		};
		dataStore.getCommodities(req);
		dataStore.getAds();
		dataStore.recordVisitCount();
	}, []);

	return (
		<>
			{newAds.length ? (
				<Carousel
					arrows
					infinite={true}
					autoplay={true}
					speed={700}
					dots={true}
					slidesToShow={3}
					responsive={[
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
							},
						},
					]}
				>
					{newAds.map(({ imgUrl }, index) => (
						<ImageContainer key={index}>
							<img src={imgUrl} />
							<NewArrivalTag />
						</ImageContainer>
					))}
				</Carousel>
			) : null}
			<Layout>
				<Products data={commodities?.data} />
			</Layout>
		</>
	);
}
