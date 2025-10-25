import { autoComposeRoutes } from '@gaman/core';
import BlogController from '../controllers/BlogController';
import BlogException from '../exceptions/BlogException';

export default autoComposeRoutes((BlogRoutes) => {
	BlogRoutes.group('/blog', (route) => {
		route.post('/', [BlogController, 'Create']);
		route.get('/', [BlogController, 'GetAll']);
		route.get('/:id', [BlogController, 'GetDetail']);
		route.put('/:id', [BlogController, 'Update']);
		route.delete('/:id', [BlogController, 'Delete']);
	}).exception(BlogException); // ? add exception handler
});
