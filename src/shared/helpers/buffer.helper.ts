import { Duplex } from 'stream';

export function bufferToStream(buffer:any) {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}