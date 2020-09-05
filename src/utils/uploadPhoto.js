import config from "../../constants";

formatData = (photo) => {
    let data = new FormData();

    data.append("photo",{
        name: "photo",
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace("file://", "")
    });

    return data;
}

export default uploadPhoto = photo => {
    return fetch(
        `${config.server_address}/image`,{
            method: "POST",
            body: formatData(photo)
        }
    ).then(
        response => response.json()
    ).catch(
        error => console.log(error)
    )
}