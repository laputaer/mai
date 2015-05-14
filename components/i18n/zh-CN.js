
/**
 * zh-CN.js
 *
 * i18n file
 */

module.exports = {
	'common': {
		'title': '买么（买买买）'
		, 'description': '「买么」是全球首家关注「产品信仰」的社区。欢迎你与我们一道，分享独特的「消费文化」。'
		, 'app-title': '买么'
		, 'domain': 'mai3.me'
		, 'tagline': '传播产品信仰 分享消费文化'
	}
	, 'menu': {
		'nav': {
			'home': '首页'
			, 'club': '我的社团'
			, 'ranking': '排行榜'
			, 'help': '使用指南'
			, 'toggle': '导航'
		}
		, 'login': {
			'twitter': '登录'
			, 'github': '登录'
		}
	}
	, 'placeholder': {
		'apology': '抱歉'
		, 'explanation': '让你看到了我们还没准备好的页面'
		, 'suggestion': '如果你认为我们显示了错误的结果'
		, 'main-feedback': '请联系开发者'
		, 'secondary-feedback': '或到我们的'
		, 'secondary-feedback-name': '开放反馈区'
		, 'secondary-feedback-action': '提交建议'
		, 'login-required': '请先登录'
	}
	, 'error': {
		'status-code': 'Error %{code}'
		, 'internal-service-down': '非常抱歉，我们的内部服务出了点问题。如果你正在执行操作，请重新尝试。'
		, 'access-control': '你没有权限执行这个操作'
		, 'invalid-csrf-token': '你提交的内容缺乏验证用的安全Token，请重新提交，同时检查域名是否为 https://mai3.me/'
		, 'form-input-invalid': '提交内容的格式不符合要求'
		, 'insufficient-action-point': '看来你的信仰值不足执行动作，需要 %{required} 点信仰，你目前只有 %{current} 点'
		, 'not-found-page': '你要找的页面不存在'
		, 'not-found-user': '你要找的团员不存在'
		, 'not-found-club': '你要找的社团不存在'
		, 'oauth-error-response': '请求 %{provider} 访问权限时发生错误，你允许了我们的请求吗？请再次尝试登陆。'
		, 'oauth-error-profile': '请求 %{provider} 用户数据时发生错误，如重复出现，请联系我们反馈错误。'
		, 'oauth-invalid-profile': '请求 %{provider} 时得到了不正确的用户数据，如重复出现，请联系我们反馈错误。'
		, 'club-already-exist': '同路径的社团已存在，请选择另一个路径。'
		, 'oembed-error-response': '请求图片时出现了错误，可能理由：(1) 该图片不支持站外引用 (2) 不是单一图片链接 (3) 网络错误'
		, 'oembed-invalid-profile': '请求图片时得到了不正确的数据，如重复出现，请联系我们反馈错误。'
	}
	, 'user': {
		'oauth-origin': '来自站点'
		, 'current-action-point': '当前信仰'
		, 'base-action-point': '信仰基数'
		, 'placeholder-1': '感谢注册，请静候本站的变化。'
		, 'placeholder-2': '等不及？请到 %{feedback} 或 %{developer} 反馈你的好点子！'
	}
	, 'club': {
		'new-club': '创建社团'
		, 'new-club-intro': '欢迎创建属于你的社团，如果这是你第一次尝试创建社团，请务必查看「使用帮助」。'
		, 'new-club-submit': '确认创建'
		, 'edit-club': '管理社团'
		, 'edit-club-intro': '欢迎回来，团长。在这里你可以管理社团的各种常见设定：名称、路径、简介、团徽等等。更多功能将随着社团的成长加入。'
		, 'edit-club-submit': '确认修改'
		, 'edit-form-cancel': '返回社团'
		, 'edit-title': '社团名称'
		, 'edit-title-note': '允许2-16个字符'
		, 'edit-title-placeholder': '例如：Love Live'
		, 'edit-slug': '社团路径'
		, 'edit-slug-note': '允许2-16个字符，仅限英文字母和连字符'
		, 'edit-slug-placeholder': '例如：love-live'
		, 'edit-intro': '社团简介'
		, 'edit-intro-note': '允许2-32个字符，可留空'
		, 'edit-intro-placeholder': '例如：LL大法好！'
		, 'edit-logo': '社团标志'
		, 'edit-logo-note': '复制 Flickr 的图片网址'
		, 'edit-logo-placeholder': '例如：http://flic.kr/p/...'
		, 'search-club': '搜索社团'
		, 'search-term': '搜索标题和路径'
		, 'search-term-note': '允许2-32个字符，可使用前缀，例如搜索 im 会返回 imas 社团。'
		, 'search-term-placeholder': '例如：imas'
		, 'search-submit': '搜索'
		, 'search-result': '搜索结果'
		, 'search-result-intro': '以 %{search} 开头的社团 (%{count})'
		, 'create-club': '创建社团'
		, 'create-club-intro': '你有 %{action_point} 点信仰值，创建社团需要 10 点信仰。'
		, 'create-button': '创建社团'
		, 'owned-club': '我创建的社团'
		, 'joined-club': '我加入的社团'
		, 'welcome-message': '欢迎访问「%{title}」社团。'
		, 'welcome-intro': '社团简介'
		, 'owner-intro': '社团口号：%{intro}'
		, 'message-board': '社团分享'
		, 'lv0': '组建中'
		, 'lv1': '新手社团'
		, 'lv2': '正规社团'
		, 'lv3': '活跃社团'
		, 'lv4': '核心社团'
		, 'lv5': '偶像社团'
		, 'lv6': '稀有社团'
		, 'lv7': '史诗社团'
		, 'lv8': '%{custom}'
		, 'member-count': '成员总数'
		, 'total-point': '累计积分'
		, 'level': '社团级别'
		, 'owner': '社团创始人'
		, 'image-author': '图片作者'
		, 'image-license': '图片版权'
		, 'image-copyright': '© %{provider}'
		, 'join-button': '加入社团'
		, 'leave-button': '退出社团'
		, 'join-stats': '你有 %{current} 点信仰值，将投入 2 点信仰。'
		, 'share-button': '分享至 Twitter'
		, 'share-button-text': '我创建了一个叫%{title}的社团，却被告知部员要达到5人才能保留，你能来帮忙吗？'
	}
	, 'help': {
		'main-title': '使用帮助'
		, 'main-title-note': '在这里你可以找到有关「买么」的功能介绍与常见问题回答。'
		, 'main-title-suggestion': '未能找到你关心的解答？'
		, 'about-us-question': '「买么」是什么？'
		, 'about-us-answer-1': '我们是一个连接创作者与消费者的社区。'
		, 'about-us-answer-2': '让创作者能获得更多读者、观众、用户的建议反馈。'
		, 'about-us-answer-3': '让消费者能与创作者、其他爱好者直接沟通、分享心得与体验。'
		, 'why-us-question': '为什么创建这个社区？'
		, 'why-us-answer-1': '我们希望给创作者与消费者一片天地，发现更有价值的内容，建立更有意思的关系。'
		, 'why-us-answer-2': '我们认为「社团」很好的概括了这种开放、互助的文化。'
		, 'explain-tagline-question': '什么是「产品信仰」和「消费文化」？'
		, 'explain-tagline-answer-1': '在我们眼中，「产品」是可以消费的文化，「信仰」是驱动消费的源泉。'
		, 'explain-tagline-answer-2': '简单归纳，「产品信仰」是人们对产品的喜爱，「消费文化」是喜爱的集合。'
	}
};
