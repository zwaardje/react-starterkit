module.exports = {
    verbose: true,
    bail: false,
    moduleDirectories: [
        'src',
        'node_modules'
    ],
    moduleFileExtensions: [
        "js",
        "json",
        "ts",
        "tsx",
        "scss",
        "sass"
    ],
    rootDir: "src",
    testRegex: ".(test|spec).(ts|tsx)$",
    transform: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    coverageDirectory: "../coverage",
    testEnvironment: "jsdom",
    setupTestFrameworkScriptFile: "../test/global.ts",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/image.ts",
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    globals: {
        window: true
    }
}
