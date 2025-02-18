/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { dev } from '$app/environment';
import { error, json, redirect, type Handle } from '@sveltejs/kit';
import { updateItem } from '$db/drizzle/realtime/items';
//import { html as toReactNode } from 'satori-html';
//import type { VNode } from 'satori-html/dist/types';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws_secret_key, aws_access_key, aws_bucket_name } from '$env/static/private';
import type { InsertItem } from '$db/drizzle/realtime/schema';
//type VNode = ReturnType<typeof toReactNode>;

//import satori from 'satori';
//import { Resvg } from '@resvg/resvg-js';
//import Montserrat from '$lib/Montserrat-Regular.ttf';
//Routes
//urlStore: `/items/store/${itemID}?collection=${collectionID}`,
//urlLoad: `/items/load/${itemID}`, - get
///media/file-upload - post
const routes = [
	'/content/load',
	'/content/store',
	'/content/splice',
	'/content/media/file-upload',
	'/content/generate-screenshot'
];


/*function checkNodesForScreenShot(el: VNode) {
	if (el.props && el.props.style) {
		if (Object.hasOwn(el.props.style, 'position')) {
			if (el.props.style.position == 'fixed') el.props.style.position = 'absolute';
		}
		if (Object.hasOwn(el.props.style, 'display')) {
			//console.log(`display exists and is ${el.props.style.display}`);
			if (el.props.style.display == 'grid') {
				el.props.style.display = 'flex';
			}
		} else {
			//console.log('display is missing',el.props.style);
			el.props.style.display = 'flex';
		}
	} else {
		//console.log(el.props)
	}

	if (el.props && el.props.children && typeof el.props.children != 'string') {
		if (Array.isArray(el.props.children)) {
			//el.props.children
			el.props.children.forEach((child) => {
				checkNodesForScreenShot(child);
				//console.log(child.props.style);
			});
		} else {
			//console.log(el.props.style);
			//el.props.children
		}
	}
	//el.props.style
}*/
/*
async function generateScreenShot(html: string, css: string) {
	const width = 1000;
	const height = 1200;
	try {
		//Fixes for css
		const parsedCss = css.replaceAll(':hover', '').replaceAll(':active', '');

		const element = toReactNode(`${html}<style>${parsedCss}</style>`);
		checkNodesForScreenShot(element);
		//console.log(element);

		//console.log(element);
		//@ts-ignore
		const svg = await satori(element, {
			fonts: [
				{
					name: "'Montserrat', sans-serif",
					data: Buffer.from(Montserrat),
					style: 'normal'
				}
			],
			height,
			width
			//height,
			//width
		});
		//console.log(svg);
		const resvg = new Resvg(svg, {
			fitTo: {
				mode: 'width',
				value: width
			},
			fitTo: {
				mode: 'zoom',
				value: 1
			}
		});
		const image = resvg.render();
		const b = Buffer.from(image.asPng()).toString('base64');
		return `data:image/png;base64,${b}`;
	} catch (error) {
		console.warn(error);
		return null;
	}
}
*/
export const editorHandle = (async ({ event, resolve }) => {

	const userData = await event.locals.auth.validate();
	const { request, url } = event;
	const response = await resolve(event);
	if (request.method == 'GET' && url.pathname.startsWith('/content/load')) {

		const itemId = url.searchParams.get('itemID');

		return new Response(JSON.stringify({ data: 'wow' }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	if (request.method == 'POST' && routes.includes(url.pathname)) {
		if (url.pathname == '/content/store') {
			/*if (!userData) return error(500, 'not allowed');

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
				const contentItem = await updateItem(userData.userId, itemId, itemData);

				if (!contentItem) {
					return error(500);
				}

				return new Response(JSON.stringify({ success: true }), {
					status: 200,
					headers: {
						'Content-Type': 'application/json'
					}
				});

			}
			*/
		} else if (url.pathname == '/content/generate-screenshot') {
			/*const contentData = (await request.json()) as { html: string; css: string };
			const preview = await generateScreenShot(contentData.html,contentData.css);
			return json({ image: preview });*/
		} else if (url.pathname == '/content/media/file-upload') {
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
		} else if (url.pathname == '/content/splice') {
			const spliceData = await event.request.json();
			console.log('saving splice data', spliceData);
			return json({ data: 'works' });
		}

		//console.log('post');
		//throw error(403,'Unresolved Post Request');
		//return json({ data: 'wow' });
	}




	return response;
}) satisfies Handle;
