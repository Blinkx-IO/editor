import type { PexelImage } from "./types";

export async function fetchImages(query: string | undefined = undefined): Promise<PexelImage[]> {
    let params = ``;
    if (query != undefined) {
        params = `query=${query}`;
    }

    return fetch(`/get-pexel-photos?${params}`, {
        method: "POST"
    })
        .then((response) => response.json())
        .then((result) => {
            //console.log(result);
            return result.images.photos;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
