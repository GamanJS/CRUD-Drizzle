import { composeController } from '@gaman/core';
import { BlogService, BlogServiceType } from '../services/BlogService';
import { HttpException } from '@gaman/common';

export default composeController(
	(service: BlogServiceType = BlogService()) => ({
		// CREATE BLOG
		// PARAM: /blog
		async Create(ctx) {
			const { title, content } = await ctx.json();

			// Check title & content
			if (!title || !content) {
				return Res.json({
					message: 'Title and Content is required!',
				});
			}
			const blog = await service.CreateBlog(title, content);

			return Res.json(
				{
					message: 'Blog created successfully!',
					data: blog,
				},
				{ status: 200 },
			);
		},

		// GET ALL BLOGS
		// PARAM: /blog
		async GetAll(ctx) {
			const blogs = await service.GetAllBlog();

			return Res.json({
				message: 'Get all blogs successfully!',
				data: blogs,
			});
		},

		// GET DETAIL BLOG
		// PARAM:/blog/:id
		async GetDetail(ctx) {
			const { id } = ctx.params;
			// Check blog
			const blog = await service.GetDetailBlog(id);
			if (!blog)
				return Res.json({ message: 'Blog not found' }, { status: 404 });

			return Res.json({
				message: 'Get all blogs successfully!',
				data: blog,
			});
		},

		// UPDATE BLOG
		// PARAM:/blog/:id
		async Update(ctx) {
			const { title, content } = await ctx.json();
			const { id } = ctx.params;

			try {
				const blog = await service.UpdateBlog(id, title, content);
				return Res.json({
					message: 'Update blog successfully!',
					data: blog,
				});
			} catch (error) {
				if (error instanceof HttpException) {
					return Res.json(
						{
							message: error.message,
						},
						error.statusCode,
					);
				} else {
					return Res.internalServerError({
						message: 'Internal server error!',
					});
				}
			}
		},

		// DELETE BLOG
		// PARAM:/blog/:id
		async Delete(ctx) {
			const { id } = ctx.params;

			try {
				const blog = await service.DeleteBlog(id);
				return Res.json({
					message: `Delete blog ${blog.title} successfully!`,
					data: blog,
				});
			} catch (error) {
				if (error instanceof HttpException) {
					return Res.json(
						{
							message: error.message,
						},
						error.statusCode,
					);
				} else {
					return Res.internalServerError({
						message: 'Internal server error!',
					});
				}
			}
		},
	}),
);
