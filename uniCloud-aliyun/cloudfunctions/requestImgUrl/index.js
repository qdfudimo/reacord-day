'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数 
	console.log('event : ', event)
	const url = [
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/de94e8ec-dc64-4a3e-99b8-cb3653bd5379.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/e195f3eb-3798-422e-baa5-c32097507e04.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/9f4c534a-464b-46e3-884d-2385d5ff57a5.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/998c07b0-c9aa-4d00-bfbc-eb6e931acb93.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/aa84ed21-5243-466b-9e5a-16f188c8f759.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/fecb85c5-e870-43a9-9950-92a91d3a1a3d.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/4bf69925-6582-4415-9280-7a0944474da6.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/318ed448-b169-44f1-bf0e-941b9174e123.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/a3a9c295-e022-40d8-9bca-52f8a1a5c548.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/a88abc50-cd82-44aa-88cd-9dda6dede67c.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/a7293d03-e272-4aa3-abb5-43c7c3231071.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/d7a2afcd-3523-447f-b0e9-091d51f3751b.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/2591ada9-85ce-4b62-bc56-8bbd558f84e4.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/dab4b005-f8d0-4d11-9ac4-a2c3cc2ccdad.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/3e0cc7b0-b7b6-41c0-b787-2717addbb0aa.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/771e4817-3fa2-4dca-aa17-8773df2da585.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/167d2c28-1073-4d0e-8e49-c9b43f02a55a.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/db612ff9-a3a0-4b1a-aa67-939a822d0911.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/aa97cf53-b653-422f-9220-2ece56bef1ea.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/f7d83962-2251-4893-b7b7-bc45856c4ec6.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/8012e34c-4093-4379-ae73-db0a4c5b514d.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/c4917836-310e-42f2-afc4-c0ee84cc2396.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/a9a0af6d-5406-4047-8a62-db2ba726af81.png",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/cb8e096d-e3d8-4cc2-b8a7-dbb46dd189c6.png"
	]
	const colorArr = ["#f4ea2a", "#035e1d", "#7d8eed", "#eac4f2", "#d6e4a2", "#f7e7d1", "#2c2c2c", "#7efa19", "#8cbb19", "#d6204b", "#004198", "#e0620d"]
	const randomImg = [
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/c8446bbf-6121-47fb-ac08-35affdfae2b6.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/1433b052-daab-4f5d-afcd-6ff071e24a7c.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/2284dc69-b4c5-4a6e-aaf2-de7a7429d382.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/897baf77-401a-42c5-a6e5-fe0ee0be1738.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/630592af-8e5a-4262-a9bf-98139ad44a19.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/e60e944f-ca5f-423e-ad49-87345a271e2b.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/431a8a5f-b029-49ad-8df4-4cab53385263.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/bd229f4c-86eb-4399-a39b-460d764d456b.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/0ece416d-4e46-4a26-83bc-d4fa453b72de.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/31e0be52-618e-469a-a070-ed2bbfb8c9dd.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/4ba5b999-9b96-4b39-b1d5-88c5e6e0ea94.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/7bf6a7eb-dba2-440d-8717-7c6b01a5a6e4.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/34bc5696-85e5-400c-bf03-77b191ffadd4.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/445d582b-cd5d-412c-b598-53abd5ac1b57.jpg",
		"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/01c9908a-569f-4a16-b85e-29098ad9b344.jpg"
	]
	//返回数据给客户端
	return {
		code: 0,
		data: url,
		colorArr,
		randomImg
	}
};