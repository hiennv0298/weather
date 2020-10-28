import translate from 'open-translate';

export async function translateText(text) {
    const result = await translate(text, {
        tld: "cn",
        to: "zh-CN",
    });
    return result;
}

