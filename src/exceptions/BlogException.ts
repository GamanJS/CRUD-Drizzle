import { HttpException } from '@gaman/common';
import { composeExceptionHandler } from '@gaman/core';

export default composeExceptionHandler((err) => {
	if (err instanceof HttpException) {
		return Res.internalServerError({
			message: 'Internal Server Error',
		});
	}
});
