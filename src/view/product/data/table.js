export const historyColumns = [
    {
      type: "index",
      title: "序号",
      // fixed
    },
    {
      title: '商品名称',
      key: 'name',
      // fixed
    },
    {
      title: '分类',
      key: 'classify'
    },
    {
      title: '链接',
      key: 'link'
    },
    {
      title: '状态',
      key: 'status'
    },
    {
      title: '排序',
      key: 'sort'
    },
    {
      title: '是否首页热门',
      key: 'is_hot'
    },
    {
      title: '热门排序',
      key: 'hot_sort'
    },
    {
      title: '位置',
      key: 'position'
    },
    {
      title: '创建时间',
      key: 'create_time'
    },
    {
      title: '操作',
      key: 'BIZ_OPT',
      // fixed: "right"
    },
	];
	
	export const productList = {
		"histories": [
      {
        "name": "有钱",
        "classify": "现金贷",
        "link": "http://www.baidu.com",
        "status": "下架",
        "sort": "1",
        "is_hot": "是",
        "hot_sort": "1",
        "position": "默认",
        "create_time": "2019-8-16 12:26:12"
      },
    ]
	};

	export const status1 = [
		{
			value: 'beijing',
			label: '北京市'
		},
		{
			value: 'shanghai',
			label: '上海市'
		},
		{
			value: 'shenzhen',
			label: '深圳市'
		},
	]