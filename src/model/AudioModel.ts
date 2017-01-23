export interface AudioPlayerModel {

    src: string;
    completed: number;
    isMusicPlaying: boolean
    isFinished: boolean
    progress: number
    duration: number;
    id: number;
    isLoading: boolean;
    hasLoaded: boolean;
    isPaused: boolean;
    showDuration: boolean;
    pauseSrc: string;
    connecting: boolean;
    error: boolean;

    play();
    pause();
    stop();
    seekTo(time: number);
    destroy();
}