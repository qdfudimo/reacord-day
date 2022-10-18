'use strict';
const {
	verifyToken,
	msgSecCheck
} = require('wx-common')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		token
	} = event;
	const payload = token ? await verifyToken(token) : null;
	const db = uniCloud.database();
	const collection = db.collection("personal-signature");
	const dbCmd = db.command;
	const now = new Date().getTime();
	if (!payload) {
		return {
			errorCode: 2,
			message: "token验证失败"
		}
	}
	const userId = payload.id
	switch (event.type) {
		case "read":
			//读取
			const personalData = await collection.where({
				user_id: userId,
				create_time: dbCmd.lt(now),
				status: 1
			}).field({
				'user_id': false,
				"status": false
			}).orderBy("create_time", "desc").limit(1).get()
			personalData.isOriginal = true
			if (personalData.affectedDocs == 0) {
				let res = await uniCloud.callFunction({
					name: "getFamousSaying",
					data: {
						type: "oneSearch",
						token: token
					}
				})
				if (res.success && res.result.affectedDocs == 1) {
					let {
						_id,
						famousContent,
						creator,
						ifCollect,
					} = res.result.data[0]
					personalData.isOriginal = false
					personalData.affectedDocs = 1;
					personalData.data = [{
						_id,
						famousContent,
						creator,
						ifCollect
					}]
				}
			}
			return personalData
		case "readHistory":
			//查询历史数据
			const readHistory = await collection.where({
				user_id: userId,
				create_time: dbCmd.lt(now)
			}).field({
				'user_id': false,
				"status": false
			}).orderBy("create_time", "desc").limit(10).get()
			return readHistory
		case "add":
			let addData = {
				success: true
			};
			if (event.id) {
				//更新状态
				// await collection.doc(event.id).update({status: 0})
				await await collection.where({
					user_id: dbCmd.eq(userId)
				}).update({
					status: 0
				})
			}
			if (event.famousContent || (event.famousContent == 0 && event.famousContent != "")) {
				const res = await msgSecCheck(payload.openid, `${event.famousContent}${event.creator}`);
				if (res.result.suggest != "pass") {
					return {
						err: 1,
						msg: "内容不安全"
					};
				}
				//新增
				addData = await collection.add({
					user_id: userId,
					famousContent: event.famousContent,
					creator: event.creator,
					create_time: now,
					status: 1
				})
			}
			return addData
	}
	//返回数据给客户端

};