import { autoComposeRoutes } from '@gaman/core';
import BlogController from '../controllers/BlogController';

export default autoComposeRoutes((BlogRoutes) => {
	BlogRoutes.group('/blog', (route) => {
		route.post('/', [BlogController, 'Create']);
		route.get('/', [BlogController, 'GetAll']);
		route.get('/:id', [BlogController, 'GetDetail']);
		route.put('/:id', [BlogController, 'Update']);
		route.delete('/:id', [BlogController, 'Delete']);
	});
});
