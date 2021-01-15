const en = require('../translations/en.json');

module.exports = {
    initReactI18next: () => {},
    useTranslation: () => {
        return {
            t: (key, obj) => {
                // TODO: This does not handle dot notation or anything like that
                const str = en[key];
                if (obj && Object.keys(obj)) {
                    let finalStr = str;
                    for (const key of Object.keys(obj)) {
                        finalStr = finalStr.replace(`{{${key}}}`, obj[key]);
                    }
                    return finalStr;
                }
                return en[key];
            }
        }
    }
}
