'use strict';
const {
	verifyToken
} = require('wx-common')
exports.main = async (event, context) => {
	const {
		token
	} = event;
	const payload = token ? await verifyToken(token) : null;
	const db = uniCloud.database();
	const collection = db.collection("record-users");
	const dbCmd = db.command;
	const now = new Date().getTime();
	if (!payload) {
		return {
			errorCode: 2,
			message: "token验证失败"
		}
	}

	function read(id) {
		return new Promise((resolve, reject) => {
			collection.doc(id).field({
				'session_key': false,
				'collect_short': false,
				'create_time': false,
				'update_time': false,
				"openid": false
			}).get().then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}

	function update(id, data) {
		return new Promise((resolve, reject) => {
			collection.doc(id).update({
				...data,
				update_time: now
			}).then(res => {
				if (event.oldUrl) {
					// 云函数删除文件示例代码 旧的url
					uniCloud.deleteFile({
						fileList: [event.oldUrl]
					});
				}
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
	if (event.type == "read") {
		let dbRes = await read(payload.id);
		return dbRes
	} else if (event.type == "update") {
		let dbRes = await update(payload.id, event.data);
		return dbRes
	}

};