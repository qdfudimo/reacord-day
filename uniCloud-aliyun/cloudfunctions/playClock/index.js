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
	const collection = db.collection("play-colck");
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
		let limit = event.pageSize || 10;
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
				clockUrl: event.clockUrl,
				...data,
				mood: event.mood,
				color: event.color,
				weather: event.weather,
				weatherUrl: event.weatherUrl || "",
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
			resolve(res)
		})
	}
	if (event.type == "read") {
		let dbRes = await read();
		return dbRes
	} else if (event.type == "add") {
		let dbRes = await add();
		await db.collection("record-users").doc(userId)
			.update({
				clockCount: dbCmd.inc(1),
			});
		return dbRes
	} else if (event.type == "del") {
		let dbRes = await deleteContent(event.id);
		await db.collection("record-users").doc(userId)
			.update({
				clockCount: dbCmd.inc(-1),
			});
		return dbRes
	}

};