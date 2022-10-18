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
	const dbCmd = db.command
	const collection = db.collection("famous-saying");
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})
	if (!payload) {
		return {
			errorCode: 2,
			message: "token验证失败"
		}
	}
	let userId = payload.id;
	let serach = `creator,famousContent,size(collection) as collectCount,in("${userId}",collection) as ifCollect`;
	//event为客户端上传的参数
	switch (event.type) {
		case "search":
			// let serach = `creator,famousContent,size(collection) as collectCount,in("${userId}",collection) as ifCollect`;
			let limit = event.pageSize;
			let skip = (event.currentPage - 1) * 10;
			const FamousQueryRes = await dbJQL.collection('famous-saying')
				.field(serach)
				.skip(skip) // 跳过前20条
				.limit(limit).get() // 获取20条.get() // 直接执行数据库操作
			return FamousQueryRes
		case "oneSearch":
			const $ = db.command.aggregate
			let res = await db.collection('famous-saying')
				.aggregate()
				.sample({
					size: 1
				}).addFields({
					'ifCollect': $.in([userId, '$collection'])
				})
				.end()
			return res
		case "mySearch":
			let limit1 = event.pageSize;
			let skip1 = (event.currentPage - 1) * 10;
			//聚合操作
			// const MyFamousQueryRes = await collection.aggregate().match({
			// 	collection: dbCmd.all([userId])}).project({collection: 0 })
			// .end() // 获取20条.get() // 直接执行数据库操作
			// const MyFamousQueryRes = await collection.where({
			// 	collection: dbCmd.all([userId])}).field({
			// 	'collection': false
			// }).skip(skip1).limit(limit1).get() // 获取20条.get() // 直接执行数据库操作
			// dbJQL.where({collection: db.command.all(["1"])})
			const MyFamousQueryRes = await dbJQL.collection('famous-saying').where(`in("${userId}",collection)`).field(serach).skip(skip1)
				.limit(limit1).get()
			return MyFamousQueryRes
			//收藏
		case "collect":
			const collectFamous = await collection.doc(event.id)
				.update({
					collection: dbCmd.push(userId),
					collectPersons: dbCmd.inc(1)
				});
			let res2 = await db.collection("record-users").doc(userId)
				.update({
					collectCount: dbCmd.inc(1),
					collect_short: dbCmd.push(event.id)
				});
			return collectFamous
			//取消收藏
		case "noCollect":
			const nocollectFamous = await collection.doc(event.id)
				.update({
					collection: dbCmd.pull(userId),
					collectPersons: dbCmd.inc(-1)
				})
			let res1 = await db.collection("record-users").doc(userId)
				.update({
					collectCount: dbCmd.inc(-1),
					collect_short: dbCmd.pull(event.id)
				});
			return nocollectFamous
		default:
			break;
	}
};