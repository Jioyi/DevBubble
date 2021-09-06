import { useCallback, useEffect, useState } from 'react';

const useResize = ({ minWidth }) => {
	const [isResizing, setIsResizing] = useState(false);
	const [width, setWidth] = useState(minWidth);

	const enableResize = useCallback(() => {
		setIsResizing(true);
	}, [setIsResizing]);

	const disableResize = useCallback(() => {
		setIsResizing(false);
	}, [setIsResizing]);

	const resize = useCallback(
		(e) => {
			if (isResizing) {
				console.log(e.clientX);
				const newWidth = e.clientX;
				if (newWidth >= minWidth) {
					setWidth(newWidth);
				}
			}
		},
		[minWidth, isResizing, setWidth]
	);

	useEffect(() => {
		document.addEventListener('mousemove', resize);
		document.addEventListener('mouseup', disableResize);

		return () => {
			document.removeEventListener('mousemove', resize);
			document.removeEventListener('mouseup', disableResize);
		};
	}, [disableResize, resize]);

	return { width, enableResize };
};

export default useResize;
