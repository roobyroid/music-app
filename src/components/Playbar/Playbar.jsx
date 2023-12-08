import { useContext, useState, useEffect } from 'react';

import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

import { AudioContext } from '../../context/AudioContext';
import secondsToMMSS from '../../utils/secondsToMMSS';

import style from './playbar.module.scss';

const TimeControls = () => {
	const [currentTime, setCurrentTime] = useState(0);

	const { audio, currentTrack } = useContext(AudioContext);

	const { duration } = currentTrack;

	const formattedDuration = secondsToMMSS(duration);
	const formattedCurrentTime = secondsToMMSS(currentTime);

	const slideCurrentTime = Math.round((currentTime / duration) * 100);

	const handleChangeCurrentTime = (_, value) => {
		const time = Math.round((value / 100) * duration);

		setCurrentTime(time);
		audio.currentTime = time;
	};

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(audio.currentTime);
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, []);
	return (
		<>
			<p>{formattedCurrentTime}</p>
			<Slider
				step={1}
				min={1}
				max={100}
				value={slideCurrentTime}
				onChange={handleChangeCurrentTime}
			/>
			<p>{formattedDuration}</p>
		</>
	);
};

const Playbar = () => {
	const { handleToggleAudio, currentTrack, isPlaying } =
		useContext(AudioContext);

	const { title, artists, preview } = currentTrack;

	return (
		<div className={style.playbar}>
			<img className={style.preview} src={preview} alt="" />
			<IconButton onClick={() => handleToggleAudio(currentTrack)}>
				{isPlaying ? <Pause /> : <PlayArrow />}
			</IconButton>
			<div className={style.credits}>
				<h4>{title}</h4>
				<p>{artists}</p>
			</div>
			<div className={style.slider}>
				<TimeControls />
			</div>
		</div>
	);
};

export default Playbar;
