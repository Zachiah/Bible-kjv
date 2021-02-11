const fs = require("fs/promises");
const path = require("path");

(async () => {
    const keys = (await fs.readdir(__dirname)).filter(item => item.match(/json$/));
    const pairs = await Promise.all(keys.map(async key => {
        const value = JSON.parse(("" + (await fs.readFile(path.resolve(__dirname,key)))))
        return [key,value];
    }));

    const obj = Object.fromEntries(pairs);
    fs.writeFile(path.resolve(__dirname,'bible.json'),JSON.stringify(obj));
})()