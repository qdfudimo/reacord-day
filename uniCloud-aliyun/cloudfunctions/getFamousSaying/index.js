'use strict';
exports.main = async (event, context) => {
	let id = event.userId;
	const db = uniCloud.database();
	const dbCmd = db.command
	const collection = db.collection("famous-saying")
	//event为客户端上传的参数
	switch (event.type) {
		case "search":
			const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
				event,
				context
			})
			let serach = `creator,famousContent,size(collection) as collectCount,in("${id}",collection) as ifCollect`;
			let limit = event.pageSize;
			let skip = (event.currentPage - 1) * 10;
			const FamousQueryRes = await dbJQL.collection('famous-saying')
				.field(serach)
				.skip(skip) // 跳过前20条
				.limit(limit).get() // 获取20条.get() // 直接执行数据库操作
			return FamousQueryRes
		case "mySearch":
			let limit1 = event.pageSize;
			let skip1 = (event.currentPage - 1) * 10;
			//聚合操作
			// const MyFamousQueryRes = await collection.aggregate().match({
			// 	collection: dbCmd.all([id])
			// }).project({
			// 	collection: 0,
			// })
			// .end() // 获取20条.get() // 直接执行数据库操作
			const MyFamousQueryRes = await collection.where({
				collection: dbCmd.all([id])
			}).field({
				'collection': false
			}).skip(skip1).limit(limit1).get() // 获取20条.get() // 直接执行数据库操作
			return MyFamousQueryRes
			//收藏
		case "collect":
			const collectFamous = await collection.doc(event.id)
				.update({
					collection: dbCmd.push(id),
					collectPersons:dbCmd.inc(1)
				});
			return collectFamous
			//取消收藏
		case "noCollect":
			const nocollectFamous = await collection.doc(event.id)
				.update({
					collection: dbCmd.pull(id),
					collectPersons:dbCmd.inc(-1)
				})
			return nocollectFamous
		default:
			break;
	}
};