import Busboy from "busboy"
import fs from 'fs'
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false
    }
}


export default async function (req, res) {


    return new Promise((resolve) => {
        const busboy = Busboy({ headers: req.headers });

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype, info) {
            console.log(
                'File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype,
            );

            const path = `public/upload/${filename.filename}`

            const stream = fs.createWriteStream(path)

            file.pipe(stream)


            file.on('data', function (data) {
                console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function () {
                console.log('File [' + fieldname + '] Finished');
            });
        });

        busboy.on('field', function (fieldname, val) {
            console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        busboy.on('finish', function (filename) {
            console.log('Done parsing form!');
            resolve(1);

        });
        req.pipe(busboy);
    });

}