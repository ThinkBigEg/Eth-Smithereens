import ipfs from './ipfs.js'

export const convertToBuffer = async (reader) => {

    const buffer = await Buffer.from(reader.result);
    // set state with buffer
    return buffer;
}

export const submitToIPFS =  (buffer) => { 
  return ipfs.add(buffer)
  };

