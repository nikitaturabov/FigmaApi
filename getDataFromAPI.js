import Figma from "figma-api";

async function getDataFromAPI() {
    const api = new Figma.Api({
        personalAccessToken: process.env.PERSONAL_TOKEN
    });

    return await api.getFile(process.env.FILE_ID);
}

export default getDataFromAPI;