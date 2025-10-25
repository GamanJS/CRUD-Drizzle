import { HttpException } from '@gaman/common';
import { composeExceptionHandler } from '@gaman/core';

export default composeExceptionHandler((err) => {
	return Res.internalServerError({
			message: 'Internal Server Error',
		});
});
