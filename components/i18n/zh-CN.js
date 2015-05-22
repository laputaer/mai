
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
		, 'login': '登录社区'
	}
	, 'error': {
		'status-code': 'Error %{code}'
		, 'internal-service-down': '非常抱歉，我们的内部服务出了点问题。如果你正在执行操作，请重新尝试。'
		, 'access-control': '你没有权限执行这个操作'
		, 'login-required': '你访问的功能需要登录用户账号'
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
		, 'opengraph-error-response': '请求远端页面时出现了网络错误，可能理由：(1) 该页面不支持站外引用 (2) 暂时的网络错误'
		, 'opengraph-invalid-profile': '请求远端页面时得到了不正确数据，如重复出现，请联系我们反馈错误。'
		, 'membership-required-to-post': '你需要先加入社团才能发布分享。'
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
		, 'edit-slug-note': '允许2-16个字符，仅限小写英文字母、数字和连字符'
		, 'edit-slug-placeholder': '例如：love-live'
		, 'edit-intro': '社团简介'
		, 'edit-intro-note': '允许2-32个字符，可留空'
		, 'edit-intro-placeholder': '例如：LL大法好！'
		, 'edit-logo': '社团标志'
		, 'edit-logo-note': '支持 Flickr / Pixiv / DeviantArt 等图片网址，可留空'
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
		, 'image-source': '图片来源'
		, 'image-source-url': '%{provider}'
		, 'image-copyright': '图片版权'
		, 'image-copyright-url': '© %{provider}'
		, 'join-button': '加入社团'
		, 'leave-button': '退出社团'
		, 'post-button': '发布新分享'
		, 'share-button': '分享到 Twitter'
		, 'new-post': '发布新分享'
		, 'new-post-intro': '看到或发布了值得分享的内容？只需要输入链接，在下一步你将有机会调整分享内容的细节。'
		, 'new-post-submit': '进入下一步'
		, 'confirm-post': '发布内容预览'
		, 'confirm-post-intro': '在这里你可以给发布的内容加上自定义标题与个人总结。'
		, 'confirm-post-submit': '确认发布'
		, 'post-link': '内容地址'
		, 'post-link-note': '复制内容对应的网址'
		, 'post-link-placeholder': '例如：http://twitter.com/...'
		, 'post-title': '自定义标题'
		, 'post-title-note': '允许2-32个字符'
		, 'post-title-placeholder': '例如：一句话介绍内容'
		, 'post-summary': '内容节选、推荐总结'
		, 'post-summary-note': '允许2-64个字符'
		, 'post-summary-placeholder': '例如：推荐内容的精彩之处'
		, 'join-stats': '你有 %{current} 点信仰值，将投入 2 点信仰。'
		, 'share-owner-text': '我创建了一个叫 %{title} 的社团，需要5人才能存活，你不来帮忙吗？'
		, 'share-other-text': '我加入了一个叫 %{title} 的社团，据说要5人才能存活，你不来帮忙吗？'
		, 'activity-item-1': '在社团'
		, 'activity-item-2': '上分享了'
		, 'activity-item-3': '的内容'
		, 'ranking-result': '今日社团排名'
		, 'home-result': '今日社团更新'
		, 'user-result': '用户近期更新'
	}
	, 'help': {
		'main-title': '使用帮助'
		, 'main-title-note': '在这里你可以找到有关「买么」的功能介绍与常见问题回答。'
		, 'main-title-suggestion': '未能找到你关心的解答？'
		, 'about-us-question': '「买么」是什么？'
		, 'about-us-answer-1': '我们是一个连接创作者与消费者的社区。'
		, 'why-us-question': '为什么创建这个社区？'
		, 'why-us-answer-1': '我们希望给创作者与消费者一片天地，交换有趣的创意，建立友好的关系。'
		, 'why-us-answer-2': '对于创作者而言：获得更多读者、观众、用户、同路人的建议反馈。'
		, 'why-us-answer-3': '对于消费者而言：与作者、其他爱好者直接沟通，分享心得与体验。'
		, 'about-club-question': '「社团」是什么？'
		, 'about-club-answer-1': '我们认为「社团」是文化的集合。'
		, 'about-club-answer-2': '我们认为「社团」代表开放、互助、激励的精神。'
		, 'about-tagline-question': '什么是「产品信仰」和「消费文化」？'
		, 'about-tagline-answer-1': '简单归纳，「产品信仰」是人们对产品的喜爱，「消费文化」是这些喜爱的集合。'
		, 'about-tagline-answer-2': '在我们眼中，「产品」是值得消费的文化；组成文化的，是每个产品和它背后的创作者与消费者。'
		, 'club-guideline-question': '社团组建，便捷教程'
		, 'club-guideline-answer-1': '创建一个社团只需要填两个输入框，但要维护好一个的社团，却有不少技巧。'
		, 'club-guideline-naming-question': '社团主题选择'
		, 'club-guideline-naming-answer-1': '我们鼓励：'
		, 'club-guideline-naming-answer-2': '(1) 围绕产品成立社团，例如：一部动画、一本小说、一家网站、一款应用。'
		, 'club-guideline-naming-answer-3': '(2) 围绕文化成立社团，例如：一派风格、一种文体、一套设计、一类服务。'
		, 'club-guideline-naming-answer-4': '(3) 选择你自身参与或很感兴趣的内容作为主题。'
		, 'club-guideline-naming-answer-5': '我们不鼓励：'
		, 'club-guideline-naming-answer-6': '(1) 围绕国家、地域、宗教、党派、性别、年龄等主题组织成立社团。它们不符合社团的开放精神。'
		, 'club-guideline-naming-answer-7': '(2) 围绕人身攻击、负面情绪的主题成立社团，例如：果黑、FFF团。它们不符合社团的激励精神。'
		, 'club-guideline-naming-answer-8': '(3) 选择你不了解的流行话题、以任何形式代表产品或作者（除非你是作者）。'
		, 'club-guideline-naming-answer-9': '别忘了，社团的成功，很大程度上取决于创始人的积极性和主题的专业性。'
		, 'club-guideline-operation-question': '社团运营建议'
		, 'club-guideline-operation-answer-1': '确定了名称与路径之后，你的社团就正式开始运作了。但如何让更多同路人、爱好者加入你？'
		, 'club-guideline-operation-answer-2': '(1) 亲自宣传：将社团分享至社交网络上，召唤朋友为你的社团存亡努力吧！'
		, 'club-guideline-operation-answer-3': '(2) 独特内容：你希望社团的好名远扬？那分享乃至创作独特的内容必不可少。'
		, 'club-guideline-operation-answer-4': '(3) 互联互动：如何培养友好的社团气氛？关注好内容的出处、鼓励参与者的协助。'
		, 'club-guideline-operation-answer-5': '四字总结：身先士卒。从说服自己动作开始，号召更多人参与吧！'
		, 'game-rule-question': '游戏系统，基本介绍'
		, 'game-rule-answer-1': '等等，为什么一个社区需要游戏系统？'
		, 'game-rule-answer-2': '因为我们想鼓励有趣的分享与独到的创意，不仅仅是转发和点赞的数量。'
		, 'game-rule-user-question': '用户信仰'
		, 'game-rule-user-answer-1': '「信仰」是用户操作的最基本单位，从创建社团到发布内容，都需要使用信仰。'
		, 'game-rule-user-answer-2': '用户每日可使用的信仰点数由「信仰基数」决定。例如新用户的基数为 15 点，即每天恢复至 15 点可用信仰。'
		, 'game-rule-user-answer-3': '以下是常见操作需要耗费的信仰：'
		, 'game-rule-user-answer-4': '(1) 创建社团：10 点。同时每日捐献 2 点信仰给创建的社团。'
		, 'game-rule-user-answer-5': '(2) 加入社团：2 点。同时每日捐献 1 点信仰给创建的社团。'
		, 'game-rule-user-answer-6': '(3) 分享内容：1 点'
		, 'game-rule-user-answer-7': '(4) 推荐内容：1 点'
		, 'game-rule-user-answer-8': '(5) 补充内容：0 点'
		, 'game-rule-user-answer-9': '目前没有恢复信仰的操作。「成就功能」推出后，用户将有办法提高自己的信仰基数。'
		, 'game-rule-club-question': '社团级别与积分'
		, 'game-rule-club-answer-1': '「级别」由社团的参与人数决定。'
		, 'game-rule-club-answer-2': '「积分」由社团的参与度与内容质量决定，来源是用户操作消耗的信仰。'
		, 'game-rule-club-answer-3': '提升社团级别与积分能解锁附加功能；活跃的社团会在排行榜上出现。'
		, 'game-rule-club-answer-4': '与此同时，如果社团维持在「组建中」级别（不到5位成员）超过一周，则会被系统冻结乃至删除。'
		, 'game-rule-club-answer-5': '值得一提，级别与积分不是评判社团好坏的客观标准。因为不同主题有不一样的受众量与资讯量。'
	}
};
