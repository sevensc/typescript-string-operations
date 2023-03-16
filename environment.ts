
let newLine = '\r\n';

function isNode() {
    try {
        return this === global;
    }
    catch {
        return false;
    }
}

if (isNode()) {
    const isWindows = typeof process != 'undefined' && 'win32' === process.platform;

    if (!isWindows) {
        newLine = '\n';
    }
}

export { newLine };