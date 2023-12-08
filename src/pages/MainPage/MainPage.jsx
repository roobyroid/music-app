import { useState } from 'react';
import { Input } from '@mui/material';

import trackList from '../../assets/trackList';
import Track from '../../components/Track/Track';

import style from './mainPage.module.scss';

const runSearch = (query) => {
	if (!query) {
		return trackList;
	}

	const lowerCaseQuery = query.toLowerCase();

	return trackList.filter(
		(track) =>
			track.title.toLowerCase().includes(lowerCaseQuery) ||
			track.artists.toLowerCase().includes(lowerCaseQuery)
	);
};

const MainPage = () => {
	const [tracks, setTracks] = useState(trackList);

	const handleChange = (event) => {
		const foundTracks = runSearch(event.target.value);
		setTracks(foundTracks);
	};

	return (
		<div className={style.search}>
			<Input
				className={style.input}
				placeholder="Поиск треков"
				onChange={handleChange}
			/>
			<div className={style.list}>
				{tracks.map((track) => (
					<Track key={track.id} {...track} />
				))}
			</div>
		</div>
	);
};

export default MainPage;
