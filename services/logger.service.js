const fs = require('fs')

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
    let now = new Date();
    return now.toUTCString();
}
function doLog(level = 'debug', ...lines) {
    const line = formatLines(lines)
    const log = `${getTime()} - ${level} - ${line}\n`
    console.log(log);
    fs.appendFileSync('./logs/backend.log', line);
}
function formatLines(lines) {
    return lines.map(line => {
        if (line instanceof Error) return line.toString()
        if (typeof line !== 'string') return JSON.stringify(line)
        return line
    }).join(' | ')
}
module.exports = {
    debug(...line) {
        doLog('debug', ...line)
    },
    info(...line) {
        doLog('info', ...line)
    },
    warn(...line) {
        doLog('warn', ...line)
    },
    error(...line) {
        doLog('error', ...line)
    }
}