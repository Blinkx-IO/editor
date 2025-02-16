/* eslint-disable @typescript-eslint/ban-ts-comment */
//import type { BlinkEditor, editorStorageObject } from "../editorTypes";
import {html, render} from "lit";

export function pageSettings(editor : VisualEditor.BlinkEditor){

    const pagesContainer = document.getElementById("pages-container") as HTMLElement;

    const pageUrl = pagesContainer.querySelector('#page-url') as HTMLInputElement;
    const siteTitle = pagesContainer.querySelector("#site-title") as HTMLInputElement;
    const siteDescription = pagesContainer.querySelector("#site-description") as HTMLInputElement;
    const favicon = pagesContainer.querySelector("#favicon") as HTMLInputElement;
    const metaImage = pagesContainer.querySelector("#meta-image") as HTMLInputElement;
    const keywords = pagesContainer.querySelector("#keywords") as HTMLInputElement;
    const author = pagesContainer.querySelector("#author") as HTMLInputElement;
    
    const fields = [pageUrl,siteTitle,siteDescription,favicon,metaImage,keywords,author];
    
    
    fields.forEach(fieldInput => {
        //@ts-ignore
        fieldInput.addEventListener("change",()=>editor.store());

        //Add a notification
    });
    
}

export const getSeoFields = ()=>{
    const pagesContainer = document.getElementById("pages-container") as HTMLElement;

    const siteTitle = pagesContainer.querySelector("#site-title") as HTMLInputElement;
    const siteDescription = pagesContainer.querySelector("#site-description") as HTMLInputElement;
    const favicon = pagesContainer.querySelector("#favicon") as HTMLInputElement;
    const metaImage = pagesContainer.querySelector("#meta-image") as HTMLInputElement;
    const keywords = pagesContainer.querySelector("#keywords") as HTMLInputElement;
    const author = pagesContainer.querySelector("#author") as HTMLInputElement;

    return {
        siteTitle : siteTitle.value,
        siteDescription:siteDescription.value,
        favicon:favicon.value,
        metaImage:metaImage.value,
        keywords:keywords.value,
        author:author.value
    };
    /*
    return JSON.stringify({
        siteTitle : siteTitle.value,
        siteDescription:siteDescription.value,
        favicon:favicon.value,
        metaImage:metaImage.value,
        keywords:keywords.value,
        author:author.value
    })*/
};

export function setSeoFields(config : VisualEditor.editorStorageObject['seo-toolkit']){
    

    const pagesContainer = document.getElementById("pages-container") as HTMLElement;

    const siteTitle = pagesContainer.querySelector("#site-title") as HTMLInputElement;
    const siteDescription = pagesContainer.querySelector("#site-description") as HTMLInputElement;
    const favicon = pagesContainer.querySelector("#favicon") as HTMLInputElement;
    const metaImage = pagesContainer.querySelector("#meta-image") as HTMLInputElement;
    const keywords = pagesContainer.querySelector("#keywords") as HTMLInputElement;
    const author = pagesContainer.querySelector("#author") as HTMLInputElement;

    siteTitle.value = config.siteTitle;
    siteDescription.value = config.siteDescription;
    favicon.value = config.favicon;
    metaImage.value = config.metaImage;
    keywords.value = config.keywords;
    author.value = config.author;

}

async function getContent(item_id : number){
    ///items/load/{item_id}
    const getItem = await fetch(`/items/load/${item_id}`,{
        method:"GET"
    });

    const response = await getItem.json();

    console.log(response); 

    //editor.Pages.select('id')
    //editor.Pages.add('')
}

//?FIX api endponints
export const setProjectLinks = async (project_id : string,editor : VisualEditor.BlinkEditor) =>{
    const projectLinks = document.getElementById('projectLinks') as HTMLElement;

    const getItems = await fetch(`/projects/links/${project_id}`,{
        method:"POST"
    });

    const resp = (await getItems.json()).links as {title:string,id:number,url_path:string}[];

    async function changeContentItem(item : string | number){
        
        
        const parseUrl = new URL(window.location.href);
        
        const collectionID = parseUrl.searchParams.get('collection');

        //@ts-ignore
        document.getElementById('idNumber').innerText = `ID:${item}`;

        editor.Storage.add('remote',{
            async load(){
                const editorLoad =  await fetch(`/items/load/${item}`,{
                    method:"GET"
                })

                const response = await editorLoad.json();
                console.log(response)

                return response
            },
            //@ts-ignore
            async store(data : editorStorageObject){
                return await fetch(`/items/store/${item}?collection=${collectionID}`,
                {
                    method:"POST",
                    body:JSON.stringify(data)
                })
            },
        })
        
        //@ts-ignore
        await editor.load();

        //Add a loading wheel?

        const panel__Title = document.getElementById('panel__Title') as HTMLInputElement;
        const toasty = html`
         <div 
         class="transition-all ease-in duration-2000"
         style="
            height: auto;
            background-color: rgba(30, 30, 30, 0.88);
            color: white;
            padding: 20px 20px 20px 20px;
            font-family: Montserrat, sans-serif;
            max-width: 300px;
            border-radius: 15px 15px 15px 15px;
            text-align: center;
            font-size: 16px;" 
        id="toasty">You've Opened <b>${panel__Title.value}</b></div>
        `;

        const toastyContainer = document.getElementById('toastyContainer') as HTMLElement;
        
        if(toastyContainer.querySelector('#toasty')){
            //@ts-ignore
            const toastyEl = document.getElementById('toasty') as HTMLElement;
            toastyEl.style.display = 'initial';
            //@ts-ignore
            toastyContainer.querySelector('#toasty').style.opacity = '1';
        }
        
        
        render(toasty,toastyContainer);

        setTimeout(() => {
            const toastyEl = document.getElementById('toasty') as HTMLElement;

            toastyEl.style.opacity = '0';
            setTimeout(() => {
                toastyEl.style.display = 'none';
            }, 2000);
        }, 2000);
        
    }
    const projectName = document.getElementById('projectName')?.innerText;
    const links = html`
    <div class="flex items-center mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
    </svg>

    ${projectName?.replace('|','').replaceAll(' ','')}
    </div>
    
    <div class="flex flex-col space-y-1">
    ${resp.map((items)=>{
        return html`
        <div class="flex items-center">
        <svg style="color:#1976d2;" class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>

           

            <div 
                style="color:#1976d2;"
                @click=${async ()=>changeContentItem(items.id)}
                data-content-item-id="${items.id}" 
                class="cursor-pointer hover:opacity-60 active:opacity-20 text-xs font-bold">
                ${items.title}
            </div> 
        </div>   
        `
    })}
    </div>
    `;

    render(links,projectLinks);
    
}

export const getPageUrl = () => {
    const pagesContainer = document.getElementById("pages-container") as HTMLElement;

    const pageUrl = pagesContainer.querySelector('#page-url') as HTMLInputElement;

    return pageUrl.value;
};

export function setPageUrl (url : string){
    const pagesContainer = document.getElementById("pages-container") as HTMLElement;

    const pageUrl = pagesContainer.querySelector('#page-url') as HTMLInputElement;

    pageUrl.value = url;
    
}