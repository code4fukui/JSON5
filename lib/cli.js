import { JSON5 } from "../JSON5.js";

const pkg = JSON.parse(await Deno.readTextFile("./package.json"));

const argv = parseArgs()

if (argv.version) {
    version()
} else if (argv.help) {
    usage()
} else {
    const inFilename = argv.defaults[0]

    let readStream
    if (inFilename) {
        readStream = await Deno.open(inFilename, { read: true })
    } else {
        readStream = process.stdin
    }

    let json5 = ''
    const decoder = new TextDecoder();
    for await (const chunk of readStream.readable) {
        json5 += decoder.decode(chunk);
    }

    {
        let space
        if (argv.space === 't' || argv.space === 'tab') {
            space = '\t'
        } else {
            space = Number(argv.space)
        }

        let value
        try {
            value = JSON5.parse(json5)
            if (!argv.validate) {
                const json = JSON.stringify(value, null, space)

                let writeStream

                // --convert is for backward compatibility with v0.5.1. If
                // specified with <file> and not --out-file, then a file with
                // the same name but with a .json extension will be written.
                if (argv.convert && inFilename && !argv.outFile) {
                    const parsedFilename = path.parse(inFilename)
                    const outFilename = path.format(
                        Object.assign(
                            parsedFilename,
                            {base: path.basename(parsedFilename.base, parsedFilename.ext) + '.json'}
                        )
                    )

                    writeStream = await Deno.open(outFilename, { create: true, write: true })
                } else if (argv.outFile) {
                    writeStream = await Deno.open(argv.outFile, { create: true, write: true })
                } else {
                    writeStream = process.stdout
                }
                
                const writer = writeStream.writable.getWriter();
                const encoder = new TextEncoder();
                writer.write(encoder.encode(json))
            }
        } catch (err) {
            console.error(err.message)
            process.exit(1)
        }
    }
}

function parseArgs () {
    let convert
    let space
    let validate
    let outFile
    let version
    let help
    const defaults = []

    const args = Deno.args;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        switch (arg) {
        case '--convert':
        case '-c':
            convert = true
            break

        case '--space':
        case '-s':
            space = args[++i]
            break

        case '--validate':
        case '-v':
            validate = true
            break

        case '--out-file':
        case '-o':
            outFile = args[++i]
            break

        case '--version':
        case '-V':
            version = true
            break

        case '--help':
        case '-h':
            help = true
            break

        default:
            defaults.push(arg)
            break
        }
    }

    return {
        convert,
        space,
        validate,
        outFile,
        version,
        help,
        defaults,
    }
}

function version () {
    console.log(pkg.version)
}

function usage () {
    console.log(
        `
  Usage: json5 [options] <file>

  If <file> is not provided, then STDIN is used.

  Options:

    -s, --space              The number of spaces to indent or 't' for tabs
    -o, --out-file [file]    Output to the specified file, otherwise STDOUT
    -v, --validate           Validate JSON5 but do not output JSON
    -V, --version            Output the version number
    -h, --help               Output usage information`
    )
}
