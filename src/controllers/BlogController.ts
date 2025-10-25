import { composeController } from '@gaman/core';
import db from '../db';
import { blogTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default composeController(() => ({
	// CREATE BLOG
	// PARAM: /blog
	async Create(ctx) {
		const { title, content } = await ctx.json();

		try {
			// Check title & content
			if (!title || !content) {
				return Res.json({
					message: 'Title and Content is required!',
				});
			}

			await db.insert(blogTable).values({
				title,
				content,
			});

			const blog = await db
				.select()
				.from(blogTable)
				.where(eq(blogTable.title, title))
				.then((rows) => rows[0]);

			return Res.json(
				{
					message: 'Blog created successfully!',
					data: blog,
				},
				{ status: 200 },
			);
		} catch (error) {
			Log.error(error);
			return Res.json(
				{
					message: 'Internal server error',
				},
				{ status: 500 },
			);
		}
	},

	// GET ALL BLOGS
	// PARAM: /blog
	async GetAll(ctx) {
		try {
			const blogs = await db.select().from(blogTable);

			return Res.json({
				message: 'Get all blogs successfully!',
				data: blogs,
			});
		} catch (error) {
			Log.error(error);
			return Res.json(
				{
					message: 'Internal server error',
				},
				{ status: 500 },
			);
		}
	},

	// GET DETAIL BLOG
	// PARAM:/blog/:id
	async GetDetail(ctx) {
		const { id } = ctx.params;
		try {
			// Check blog
			const blog = await db
				.select()
				.from(blogTable)
				.where(eq(blogTable.id, id))
				.then((rows) => rows[0]);

			if (!blog)
				return Res.json({ message: 'Blog not found' }, { status: 404 });

			return Res.json({
				message: 'Get all blogs successfully!',
				data: blog,
			});
		} catch (error) {
			Log.error(error);
			return Res.json(
				{
					message: 'Internal server error',
				},
				{ status: 500 },
			);
		}
	},

	// UPDATE BLOG
	// PARAM:/blog/:id
	async Update(ctx) {
		const { title, content } = await ctx.json();
		const { id } = ctx.params;
		try {
			// Check blog
			const blog = await db
				.select()
				.from(blogTable)
				.where(eq(blogTable.id, id))
				.then((rows) => rows[0]);

			if (!blog)
				return Res.json({ message: 'Blog not found' }, { status: 404 });

			// Check title & content
			if (!title || !content) {
				return Res.json({
					message: 'Title and Content is required!',
				});
			}

			// Update blog
			await db
				.update(blogTable)
				.set({
					title,
					content,
				})
				.where(eq(blogTable.id, id));

			return Res.json({
				message: 'Update blog successfully!',
				data: blog,
			});
		} catch (error) {
			Log.error(error);
			return Res.json(
				{
					message: 'Internal server error',
				},
				{ status: 500 },
			);
		}
	},

	// DELETE BLOG
	// PARAM:/blog/:id
	async Delete(ctx) {
		const { id } = ctx.params;
		try {
			const blog = await db
				.select()
				.from(blogTable)
				.where(eq(blogTable.id, id))
				.then((rows) => rows[0]);

			if (!blog)
				return Res.json({ message: 'Blog not found' }, { status: 404 });

			// Delete
			await db.delete(blogTable).where(eq(blogTable.id, id));

			return Res.json({
				message: `Delete blog ${blog.title} successfully!`,
				data: blog,
			});
		} catch (error) {
			Log.error(error);
			return Res.json(
				{
					message: 'Internal server error',
				},
				{ status: 500 },
			);
		}
	},
}));
