let jwt = require('jsonwebtoken');

const appId = '';
const appSecret = '';

const db = uniCloud.database();
async function requestNewAccessToken() {
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret, {
		dataType: "json"
	});
	console.log("重新请求accesstoken");
	const dbRes = await db.collection("system").limit(1).get();
	if (dbRes.data[0]) {
		await db.collection("system").doc(dbRes.data[0]._id).update({
			accesstoken: {
				value: res.data.access_token,
				expiredtime: new Date().getTime() + 7000000
			}
		});
	} else {
		await db.collection("system").add({
			accesstoken: {
				value: res.data.access_token,
				expiredtime: new Date().getTime() + 7000000
			}
		});
	}

	return res.data.access_token;
}
async function getAccessToken(forceupdate = false) {
	const dbRes = await db.collection("system").limit(1).get();
	const systemInfo = dbRes.data[0] || "";
	const now = new Date().getTime();
	if (systemInfo && !forceupdate) {
		if (now > systemInfo.accesstoken.expiredtime) {
			const accesstoken = await requestNewAccessToken();

			return accesstoken;
		} else {
			return systemInfo.accesstoken.value;
		}
	} else {
		const accesstoken = await requestNewAccessToken();

		return accesstoken;
	}
}

function getToken(openid, id) {
	return jwt.sign({
		openid,
		id,
	}, appSecret, {
		expiresIn: 60 * 60 * 24
	});
}

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, appSecret, (err, decode) => {
			if (err) {
				// 验证不通过（token过期或错误）
				resolve(false)
			} else {
				// 验证通过，decode包含主题信息、token过期时间
				resolve(decode)
			}
		})
	})
}

async function msgSecCheck(openid, content) {
	const access_token = await getAccessToken();
	console.log("正在检测 " + content + " 的内容是否安全");
	let res = await contentCheck(openid,content,access_token)
	console.log("检查结果", res);
	if (res.data.errcode != 0 && res.data.errmsg != "ok") {
		const accesstoken = await requestNewAccessToken();
		res = await contentCheck(openid,content,accesstoken)
		console.log("重新检查", res);
	}
	return res.data;
}
async function contentCheck(openid,content, access_token) {
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/wxa/msg_sec_check?access_token=" + access_token, {
		method: "POST",
		dataType: "json",
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			version: "2",
			openid: openid,
			scene: 2,
			content: content
		}
	});
	return res
}
//https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=
async function getWXACodeUnlimited(scene, page) {
	const access_token = await getAccessToken();
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + access_token, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			scene: scene,
			page: page
		}
	});

	return res.data;
}

module.exports = {
	getAccessToken,
	msgSecCheck,
	getWXACodeUnlimited,
	getToken,
	verifyToken,
	appId: appId,
	appSecret: appSecret
}