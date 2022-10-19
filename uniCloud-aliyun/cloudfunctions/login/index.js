'use strict';
const {
	appId,
	appSecret,
	getToken
} = require('wx-common')
const db = uniCloud.database();

exports.main = async (event, context) => {
	const {
		code
	} = event;
	const now = new Date().getTime();

	function read(openid) {
		return new Promise((resolve, reject) => {
			db.collection("record-users").where({
				openid: openid
			}).field({
				'session_key': false,
				'collect_short': false,
				'create_time': false,
				'update_time': false,
				"openid": false
			}).limit(1).get().then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
	//GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret + "&js_code=" + code + "&grant_type=authorization_code", {
			dataType: "json"
		}
	)
	if (res.data.errcode && res.data.errcode != 0 && !res.data.openid) {
		return {
			code: res.data.errcode,
			errmsg: res.data.errmsg
		}
	}
	const openid = res.data.openid;
	let dbRes = await read(openid);
	let userData;
	let resId;
	if (dbRes.affectedDocs <= 0) {
		userData = {
			nickName: "微信用户",
			avatarUrl: "",
			diaryCount: 0,
			clockCount: 0,
			collectCount: 0,
			create_time: now,
			update_time: now,
			collect_short: []
		}
		//不要泄露用户的openid
		resId = await db.collection("record-users").add({
			openid: openid,
			session_key: res.data.session_key,
			...userData
		});
	}
	let token;
	if (dbRes.affectedDocs || resId.id) {
		let id = dbRes.affectedDocs ? dbRes.data[0]._id : resId.id;
		db.collection("record-users").doc(id).update({
			session_key: res.data.session_key
		})
		token = getToken(openid, id);
		return {
			token: token,
			message: "登录成功"
		}
	}

	return dbRes
};