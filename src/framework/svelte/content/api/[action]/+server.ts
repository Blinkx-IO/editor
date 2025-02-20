import { getItemByUserPermissions, updateItem, updateItemApiMapping } from '$db/drizzle/realtime/items';
import type { InsertItem, ItemMappingStatus } from '$db/drizzle/realtime/schema';
import { updateLegacyItem,/*getItemById*/ } from "$db/drizzle/content/items";
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws_secret_key, aws_access_key, aws_bucket_name } from '$env/static/private';
import type { ItemInsert } from '$db/drizzle/content/schema';
import { getRealtimeDbClient } from "$db/drizzle/realtime/db";
import { Buffer } from 'node:buffer';

const routes = [
	'/content/api/load',
	'/content/api/store',
	'/content/api/splice',
	'/content/api/file-upload',
	'/content/api/generate-screenshot'
] as const;

const routeParam = [
	'load',
	'store',
	'splice',
	'file-upload',
	'generate-screenshot',
	'publish-item-mapping'
] as const;

export type EditorRoute = typeof routeParam[number];

function formatDateToString(date: Date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const milliseconds = date.getMilliseconds().toString().padStart(6, '0').substring(0, 5); // Pad to ensure 6 digits and then take the first 5

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}



export const POST: RequestHandler = async ({ params, locals, request, url, platform }) => {
	const route = params.action as EditorRoute;
	const userData = locals.session;
	if (!userData) return error(500, 'not allowed');

	if (route === 'store') {


		const data = (await request.json()) as VisualEditor.editorStorageObject;

		const itemId = url.searchParams.get('itemId');
		const project = url.searchParams.get('project');
		if (itemId && project) {
			const itemData: Partial<InsertItem> = {
				body: {
					"blink-assets": data.assets,
					"blink-components": data.components,
					"blink-css": data.css,
					"blink-html": data.html,
					"blink-styles": data.styles,
					"blink-fonts": data.fonts
				},
				seoToolkit: data['seo-toolkit'],
				title: data.title,
				status: data.status,
				urlPath: data.url,
				modifiedAt: new Date()
			}

			if (data.item_preview) {
				itemData.itemPreview = data.item_preview;
			}
			const { db, queryClient } = getRealtimeDbClient(locals, platform);
			//!change from checking if created by to user permission
			const contentItem = await updateItem(userData.userId, itemId, itemData, db);

			if (!contentItem) {
				return error(500);
			}
			if (data.itemMappingState) {
				await updateItemApiMapping(userData.userId, itemId, { status: data.itemMappingState }, db);
			}
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	if (route === 'publish-item-mapping') {
		const mappingData = await request.json() as { itemId?: string, status?: ItemMappingStatus };
		const { itemId, status } = mappingData;

		if (itemId && status) {
			//const item = await updateItem(userData.userId,itemId,{status});
			const apiMapping = await updateItemApiMapping(userData.userId, itemId, { status: status });
			if (!apiMapping) {
				error(500, 'Invalid Data');
			}
			const getItemToUpdate = await getItemByUserPermissions(userData.userId, itemId);

			if (getItemToUpdate && getItemToUpdate.length > 0) {
				const mapItemToProd: Partial<ItemInsert> = {
					body: JSON.stringify(getItemToUpdate[0].body),
					modifiedAt: formatDateToString(new Date()),
					seoToolkit: JSON.stringify(getItemToUpdate[0].seoToolkit),
					urlPath: getItemToUpdate[0].urlPath,
					title: getItemToUpdate[0].itemTitle,
				}

				if (!apiMapping[0].externalItemId) {
					//
				} else {
					//const getLegacyItem = await getItemById(apiMapping[0].externalItemId);
					await updateLegacyItem(apiMapping[0].externalItemId, mapItemToProd);
				}

			}

			//if(item){
			return json({ success: true });
			//}
		} else {
			error(500, 'Invalid Data');
		}
	}

	if (route === 'splice') {
		const spliceData = await request.json();
		console.log('saving splice data', spliceData);
		return json({ data: 'works' });
	}

	if (route === 'file-upload') {
		const assetFormData = await request.formData();
		const file = assetFormData.get('image') as File;
		const projectId = url.searchParams.get('project');
		const s3 = new S3Client({
			credentials: {
				accessKeyId: aws_access_key,
				secretAccessKey: aws_secret_key
			},
			region: 'ca-central-1'
		});

		const uploadImage = new PutObjectCommand({
			Bucket: aws_bucket_name,
			ACL: 'public-read',
			Key: `org/${userData?.currentTeam}/project/${projectId}/media/${file.name}`,
			Body: Buffer.from(await file.arrayBuffer())
		});

		const uploadResp = await s3.send(uploadImage);
		if (uploadResp.$metadata && uploadResp.$metadata.httpStatusCode == 200) {
			return json({
				data: [
					{
						src: `https://cdn.blinkcms.com/org/${userData?.currentTeam}/project/${projectId}/media/${file.name}`,
						blinkCDN: true
					}
				]
			});
		}
	}


	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const GET: RequestHandler = async ({ params, locals, request, url }) => {
	const route = params.action as EditorRoute;

	if (route === 'load') {
		const itemId = url.searchParams.get('itemID');
		return new Response(JSON.stringify({ data: 'wow' }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}


	return new Response();
}
