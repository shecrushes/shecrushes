import { memo } from 'react';

type Props = {
    imageSrc: string;
    videoId: string;
}

const PureImage = memo(function PureImage({ imageSrc, videoId }: Props) {
    return <img 
        src={imageSrc}
        alt={videoId}
        className="object-cover w-full h-full px-0.5 pb-1 rounded-md"
    />
});

export default PureImage