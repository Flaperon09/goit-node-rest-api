import Jimp from 'jimp'; // Пакет обработки аватара

const resizeImage = async (path, width = 250, height = 250, mode = Jimp.RESIZE_BEZIER) => {
    const image = await Jimp.read(path);
    await image.resize(width, height, mode);
    await image.writeAsync(path);
};

export default resizeImage