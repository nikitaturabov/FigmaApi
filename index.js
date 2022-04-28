import getDataFromAPI from "./getDataFromAPI.js";
import formatTextStyles from "./createTypography.js";
import formatColorsStyles from "./createColors.js";
import fs from 'fs';
import 'dotenv/config';

const pages = ['Typography', 'Colors'];

function getFigmaData() {
    getDataFromAPI().then((responseFile) => {
        pages.forEach(page => {
            const designSystemPage = responseFile.document.children.filter(
                (child) => child.name === page
            );

            const data = designSystemPage[0].children[0].children;

            switch (page) {
                case 'Typography':
                    writeInScssFile(page, formatTextStyles(data));
                    break;
                case 'Colors':
                    writeInScssFile(page, formatColorsStyles(data));
                    break;
            }
        })
    });
}

function mkdirpath(dirPath) {
    if (!fs.existsSync(dirPath)) {
        try {
            fs.mkdirSync(dirPath);
        }
        catch(e) {
            mkdirpath(path.dirname(dirPath));
            mkdirpath(dirPath);
        }
    }
}

function writeInScssFile(pageName, data) {
    mkdirpath(process.env.FIGMA_VARS_PATHS)

    fs.writeFileSync(
        `${process.env.FIGMA_VARS_PATHS}${pageName}.scss`,
        JSON.stringify(data).replace(/,/g, ';').replace(/"/g, '').replace(/{|}/g, '') + ';'
    );
}

getFigmaData();