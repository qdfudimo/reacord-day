'use strict';
const {
	verifyToken,
	msgSecCheck
} = require('wx-common')
exports.main = async (event, context) => {
	const {
		token
	} = event;
	const payload = token ? await verifyToken(token) : null;
	const db = uniCloud.database();
	const collection = db.collection("diary-articles");
	const dbCmd = db.command;
	const now = new Date().getTime();
	if (!payload) {
		return {
			errorCode: 2,
			message: "token验证失败"
		}
	}
	const userId = payload.id

	function read() {
		let limit = event.pageSize;
		let skip = (event.currentPage - 1) * 10;
		return new Promise((resolve, reject) => {
			collection.where({
					user_id: userId,
				}).field({
					"user_id": false
				}).skip(skip)
				.limit(limit).orderBy("create_time", "desc").get().then(res => {
					// .limit(limit).orderBy("is_sticky", "desc").orderBy("create_time", "desc").get().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
		})
	}

	function add() {
		return new Promise((resolve, reject) => {
			let data = {}
			if (event.longitude && event.latitude) {
				data.name = event.name
				data.address = event.address
				//	longitude 目标地经度 latitude 目标地纬度
				data.point = new db.Geo.Point(event.longitude, event.latitude)
			}
			//新增
			collection.add({
				user_id: userId,
				content: event.content,
				...data,
				is_sticky: 0,
				mood: event.mood,
				imgUrl: event.imgUrl,
				create_time: now,
				update_time: now,
			}).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}

	function deleteContent(id) {
		return new Promise(async (resolve, reject) => {
			let res = await collection.doc(id).remove();
			if (event.oldImgUrl) {
				// 云函数删除文件示例代码 旧的url
				await uniCloud.deleteFile({
					fileList: [event.oldImgUrl]
				});
			}
			resolve(res)
		})
	}
	if (event.type == "read") {
		let userInfo={};
		if (event.ifRequestInfo) {
			userInfo = await db.collection("record-users").doc(userId).field({
				'nickName': true,
				'avatarUrl': true
			}).get();
		}
		let dbRes = await read();
		if (dbRes.affectedDocs && userInfo.affectedDocs) {
			dbRes.nickName = userInfo.data[0].nickName
			dbRes.avatarUrl = userInfo.data[0].avatarUrl
		}
		return dbRes
	} else if (event.type == "add") {
		const res = await msgSecCheck(payload.openid, `${event.content}`);
		if (res.result.suggest != "pass") {
			return {
				err: 1,
				msg: "内容不安全"
			};
		}
		let dbRes = await add();
		await db.collection("record-users").doc(userId)
			.update({
				diaryCount: dbCmd.inc(1),
			});
		return dbRes
	} else if (event.type == "del") {
		let dbRes = await deleteContent(event.id);
		await db.collection("record-users").doc(userId)
			.update({
				diaryCount: dbCmd.inc(-1),
			});
		return dbRes
	}

};