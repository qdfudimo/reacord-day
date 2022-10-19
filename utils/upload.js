// import {
//     pickExclude
// } from '../common/utils';
import util from "@/utils/util";
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

function isImageUrl(url) {
    return IMAGE_REGEXP.test(url);
}

export function isImageFile(item) {
    if (item.isImage != null) {
        return item.isImage;
    }

    if (item.type) {
        return item.type === 'image';
    }

    if (item.url) {
        return isImageUrl(item.url);
    }

    return false;
}

function isPlainObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function pickExclude(obj, keys) {
    if (!isPlainObject(obj)) {
        return {};
    }

    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }

        return prev;
    }, {});
}

function formatImage(res) {
    console.log(res);
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        type: 'image',
        url: item.path,
        thumb: item.path
    }));
}

function formatFile(res) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        url: item.path
    }));
}
/**
 * 选择照片
 * @param {*sourceType} album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
 * @param {*sizeType} original 原图，compressed 压缩图，默认二者都有
 * @returns 
 */
export function chooseFile({
    accept,
    maxCount = 9,
    multiple = true,
    sourceType = ['album', 'camera'],
    sizeType = ['original', 'compressed']
}) {
    return new Promise((resolve, reject) => {
        switch (accept) {
            case 'img':
                uni.chooseImage({
                    count: multiple ? Math.min(maxCount, 9) : 1,
                    sourceType,
                    sizeType,
                    success: (res) => resolve(formatImage(res)),
                    fail: reject
                });
                break;

            default:
                uni.chooseMessageFile({
                    count: multiple ? maxCount : 1,
                    type: accept,
                    success: (res) => resolve(formatFile(res)),
                    fail: reject
                });
                break;
        }
    });
}
export const uplodFile = (filePath = "") => {
    if (!filePath) return
    let ext = filePath.split('.').pop()
    return new Promise((resolve, reject) => {
        uniCloud.uploadFile({
            filePath,
            cloudPath: Date.now() + "." + ext,
            success(res) {
                resolve(res)
            },
            fail(error) {
                reject(error)
                console.log(error);
                util.tip("上传失败", "error")
            },
        });
    })
}