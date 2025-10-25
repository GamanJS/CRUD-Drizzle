import { composeService } from '@gaman/core';
import db from '../db';
import { blogTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { HttpException } from '@gaman/common';

export const BlogService = composeService(() => ({
	async CreateBlog(title: string, content: string) {
		await db.insert(blogTable).values({
			title,
			content,
		});

		return await db
			.select()
			.from(blogTable)
			.where(eq(blogTable.title, title))
			.then((rows) => rows[0]);
	},

	async GetAllBlog() {
		return await db.select().from(blogTable);
	},

	async GetDetailBlog(id: string) {
		return await db
			.select()
			.from(blogTable)
			.where(eq(blogTable.id, id))
			.then((rows) => rows[0]);
	},

	async UpdateBlog(id: string, title?: string, content?: string) {
		const blog = await db
			.select()
			.from(blogTable)
			.where(eq(blogTable.id, id))
			.then((rows) => rows[0]);

		if (!blog) {
			// ! btw sementara null dulu context nya entahlah haru masukin context kwkwk ntar gw fix di gaman core nya
			throw new HttpException('Blog not found', 404, null as any);
		}

		if (!title || !content) {
			// ! btw sementara null dulu context nya entahlah haru masukin context kwkwk ntar gw fix di gaman core nya
			throw new HttpException(
				'Title and Content is required!',
				400,
				null as any,
			);
		}

		await db
			.update(blogTable)
			.set({
				title,
				content,
			})
			.where(eq(blogTable.id, id));

		return blog;
	},

	async DeleteBlog(id: string) {
		const blog = await db
			.select()
			.from(blogTable)
			.where(eq(blogTable.id, id))
			.then((rows) => rows[0]);

		if (!blog) {
			// ! btw sementara null dulu context nya entahlah haru masukin context kwkwk ntar gw fix di gaman core nya
			throw new HttpException('Blog not found', 404, null as any);
		}

		await db.delete(blogTable).where(eq(blogTable.id, id));
		return blog;
	},
}));

export type BlogServiceType = ReturnType<typeof BlogService>;
