import ipfs from './ipfs.js'

export const convertToBuffer = async (reader) => {

    const buffer = await Buffer.from(reader.result);
    // set state with buffer
    return buffer;
}

export const submitToIPFS =  (buffer) => { 
  console.log ('buffer from wrapper : ', buffer);
  let url  = 'https://gateway.ipfs.io/ipfs/';
  return ipfs.add(buffer)
  };

