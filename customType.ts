/* eslint-disable @typescript-eslint/no-namespace */
export type status = "Draft" | "Published" | "Inactive";
export interface editorStorageObject {
    customHtml: string;
    title: string;
    status: status;
    csvParser: any;
    components: string;
    url : string;
    dynamic: boolean;
    "seo-toolkit":string;
    fonts:string[];
    project:string;
}
