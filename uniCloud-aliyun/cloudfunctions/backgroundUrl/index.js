'use strict';
const {
	verifyToken
} = require('wx-common')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		token
	} = event;
	const payload = token ? await verifyToken(token) : null;
	const type = event.type
	const db = uniCloud.database();
	const collection = db.collection("background_img")
	if (!payload) {
		return {
			errorCode: 2,
			message: "token验证失败"
		}
	}

	function add(url) {
		return new Promise((resolve, reject) => {
			collection
				.add({
					user_id: payload.id,
					imgUrl: url,
					type: event.imgType
				}).then(res => {
					res.success = true
					resolve(res)
				}).catch(error => {
					reject(error)
				})
		})
	}

	function read() {
		return new Promise((resolve, reject) => {
			collection.where({
				user_id: payload.id,
				type: event.imgType
			}).field({
				'user_id': false,
				'type': false,
			}).get().then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}

	function deleteId() {
		return new Promise(async (resolve, reject) => {
			let res = await collection.doc(event.id).remove();
			if (event.oldImgUrl) {
				// 云函数删除文件示例代码 旧的url
				await uniCloud.deleteFile({
					fileList: [event.oldImgUrl]
				});
			}
			resolve(res)
		})
	}

	function updateUrl() {
		return new Promise((resolve, reject) => {
			collection.doc(event.id).update({
				imgUrl: event.url
			}).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
	if (type == "read") {
		let homeBackground = await read()
		// console.log(homeBackground, 22);
		if (event.imgType == 1 && !homeBackground.affectedDocs) {
			let url = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/897baf77-401a-42c5-a6e5-fe0ee0be1738.jpg";
			let res = await add(url);
			homeBackground = await read()
			console.log(homeBackground, 8888);
		}
		return homeBackground
	} else if (type == "add") {
		let addBackground;
		if (event.url) {
			addBackground = await add(event.url)
		}
		if (event.id) {
			await deleteId()
		}
		return addBackground
	} else if (type == "delete") {
		if (event.id) {
			let res = await deleteId()
			return res
		}
	} else if (type == "update") {
		let res = await updateUrl()
		if (event.isDel) {
			await uniCloud.deleteFile({
				fileList: [event.oldImgUrl]
			});
		}
		return res
	}

	//返回数据给客户端

};