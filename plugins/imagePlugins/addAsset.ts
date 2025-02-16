interface asset{
    src:string
}

export async function addImage(collectionID : any, img : string, id : string) :Promise<asset>  {
    
    const blob = await fetch(img).then(r => r.blob());

    const formData = new FormData();
    console.log(img);
    let name = img.replace(`https://images.pexels.com/photos/${id}/`,"");
    name = name.replace('?auto=compress&cs=tinysrgb&h=350',"");

    const file = new File([blob], name);
    formData.append("image",file);

    return fetch(`/media/file-upload?collection=${collectionID}`, {
      method: "POST",
      body:formData
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        return result.data[0];
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}